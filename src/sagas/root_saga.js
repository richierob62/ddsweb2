// take = listen for action
// fork = run gf non-blocking
// put = dispatch action
// call = call regular function
// select = use reducer selector, passing state
// cancel = cancel promise

import { take, put, call, fork, select, takeLatest } from 'redux-saga/effects'
import act from '../actions'
import { getCurrentRecord, getSelectedID } from '../selectors'
import table_names from '../reducers/table_list'
import proper_camel from '../utils/proper_camel'

const ends_with = (name, suffix) =>
  name.indexOf(suffix) === name.length - suffix.length

const singular_of_name = reducer_name => {
  if (ends_with(reducer_name, 'ses'))
    return reducer_name.substr(0, reducer_name.length - 2)
  if (ends_with(reducer_name, 'ies'))
    return reducer_name.substr(0, reducer_name.length - 3) + 'y'
  return reducer_name.substr(0, reducer_name.length - 1)
}

// /******************************************************************************/
// /********************************* CONFIG *************************************/
// /******************************************************************************/

const domain = 'http://ddsweb-api.app/'

// /******************************************************************************/
// /********************** API CALLING MACHINE ***********************************/
// /******************************************************************************/

const statusHelper = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response))
  }
}

const postApi = (uri, payload, token) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  headers.append('Api-Token', token)

  const body = JSON.stringify(payload)

  return fetch(uri, { headers, method: 'POST', body })
    .then(statusHelper)
    .then(response => response.json())
}

// /******************************************************************************/
// /********************** SIDE EFFECT CENTRAL ***********************************/
// /******************************************************************************/

function* loadReferenceList(reducer) {
  const url = domain + singular_of_name(reducer) + '_reference'

  const token = yield getToken()

  const { data } = yield call(postApi, url, {}, token)

  const closing_action = 'load' + proper_camel(reducer) + 'ReferenceCompleted'

  yield put(act[closing_action](data))
}

function* loadFilteredAndSortedData(reducer) {
  const url = domain + reducer
  const sort_name = yield getSortName(reducer)
  const sort_dir = yield getSortDir(reducer)
  const filters = yield getFilters(reducer)
  const token = yield getToken()
  const { data } = yield call(
    postApi,
    url,
    { filters, sort_name, sort_dir },
    token
  )
  const closing_action = 'load' + proper_camel(reducer) + 'ListCompleted'
  yield put(act[closing_action](data))
}

function* saveNewToDatabase(reducer) {
  const url = domain + 'new_' + singular_of_name(reducer)

  // get data to save
  const payload = (yield getRecordToSave(reducer)).toJS()

  delete payload['id']

  if (reducer === 'customers') {
    // get a new account number (customer)
    const acc_num = yield getNextCustomerAccountNumber()
    payload.account_num = acc_num
  }

  const token = yield getToken()
  const returned = yield call(postApi, url, payload, token)
  let closing_action
  if (returned.errors) {
    closing_action = 'save' + proper_camel(reducer) + 'Failed'
    yield put(act[closing_action](returned.errors))
  } else {
    closing_action = 'save' + proper_camel(reducer) + 'Completed'
    yield put(act[closing_action](returned.data))
  }
}

function* saveEditToDatabase(reducer) {
  const url = domain + 'edit_' + singular_of_name(reducer)

  // get data to save
  const payload = (yield getRecordToSave(reducer)).toJS()
  Object.keys(payload).map(key => {
    if (!payload[key]) payload[key] = ''
    return null
  })
  const token = yield getToken()
  const returned = yield call(postApi, url, payload, token)

  let closing_action

  if (returned.errors) {
    closing_action = 'save' + proper_camel(reducer) + 'Failed'
    yield put(act[closing_action](returned.errors))
  } else {
    closing_action = 'save' + proper_camel(reducer) + 'Completed'
    yield put(act[closing_action](returned.data))
  }
}

function* deleteItem(reducer) {
  const url = domain + 'delete_' + singular_of_name(reducer)

  // get data to save
  const payload = { id: yield getIdOfRecordToDelete(reducer) }

  const token = yield getToken()
  const returned = yield call(postApi, url, payload, token)

  let closing_action
  if (returned.errors) {
    closing_action = 'delete' + proper_camel(reducer) + 'Failed'
    yield put(act[closing_action](returned.errors))
  } else {
    closing_action = 'delete' + proper_camel(reducer) + 'Completed'
    yield put(act[closing_action](returned.data))
  }
}

function* getNextCustomerAccountNumber() {
  const url = domain + 'next_customer_number'
  const token = yield getToken()
  return yield call(postApi, url, {}, token)
}

function* attemptLogin(action) {
  const payload = {
    email: action.payload.email,
    password: action.payload.pass
  }

  const url = domain + 'login'
  const returned = yield call(postApi, url, payload)

  let closing_action
  if (returned.errors) {
    closing_action = 'authFail'
    yield put(act[closing_action]({ message: returned.errors }))
  } else {
    closing_action = 'authSuccess'
    yield put(act[closing_action](returned.data))
    yield gotoOriginalDestination()
  }
}

function* handleSort(reducer, action) {
  const prev_sorted_on = yield getSortName(reducer)
  const prev_sorted_dir = yield getSortDir(reducer)
  const new_sort_field = action.payload
  const ref_reducer_name = yield getReferenceTableName(reducer, new_sort_field)

  let valueMapper
  if (ref_reducer_name === undefined) valueMapper = a => a.get(new_sort_field)
  else
    valueMapper = yield valueMapperGenerator(
      ref_reducer_name,
      new_sort_field + '_id'
    )

  const new_direction =
    action.payload === prev_sorted_on
      ? prev_sorted_dir === 'ASC' ? 'DESC' : 'ASC'
      : 'ASC'

  const sortFunc = (a, b) => {
    const first = a.toUpperCase()
    const second = b.toUpperCase()
    const multiplier = new_direction === 'ASC' ? 1 : -1
    if (first < second) {
      return -1 * multiplier
    }
    if (first > second) {
      return 1 * multiplier
    }
    if (first === second) {
      return 0
    }
  }

  const sorted_list = (yield getFilteredList(reducer)).sortBy(
    valueMapper,
    sortFunc
  )

  const payload = {
    reducer: reducer,
    list: sorted_list,
    field_name: new_sort_field,
    direction: new_direction
  }

  yield put(act.sortChangeCompleted(payload))
}

// /******************************************************************************/
// /******************************* SELECTORS *************************************/
// /******************************************************************************/

function* getNewPage() {
  const state = yield select(s => s['pageChange'])
  return state.get('current_path')
}

function* getToken() {
  const state = yield select(s => s['auth'])
  return state.get('token')
}

function* getFilters(reducer) {
  const state = yield select(s => s[reducer])
  return state.get('current_filters').toJS()
}

function* getSortName(reducer) {
  const state = yield select(s => s[reducer])
  return state.getIn(['current_sort', 'field_name'])
}

function* listIsDirty(reducer) {
  const state = yield select(s => s[reducer])
  return state.get('list_dirty')
}

function* getReferenceTables(reducer) {
  const state = yield select(s => s[reducer])
  return state.get('referenced_tables')
}

function* refListIsDirty(reducer) {
  const state = yield select(s => s[reducer])
  return state.get('ref_list_dirty')
}

function* getSortDir(reducer) {
  const state = yield select(s => s[reducer])
  return state.getIn(['current_sort', 'direction'])
}

function* getReferenceTableName(reducer, field_name) {
  const state = yield select(s => s[reducer])
  return state.getIn(['fields', field_name, 'ref_table'])
}

function* getReducer(reducer) {
  return yield select(s => s[reducer])
}

function* getFilteredList(reducer) {
  const state = yield select(s => s[reducer])
  return state.get('list')
}

function* getRecordToSave(reducer) {
  const state = yield select(s => s[reducer])
  return getCurrentRecord(state)
}

function* getIdOfRecordToDelete(reducer) {
  const state = yield select(s => s[reducer])
  return getSelectedID(state)
}

function* gotoOriginalDestination() {
  const state = yield select(s => s['auth'])
  const history_obj = state.get('history_obj')
  const dest = state.get('next_page')
  history_obj.push(dest)
  return null
}

// /******************************************************************************/
// /************************** FUNCTION GENERATORS *******************************/
// /******************************************************************************/

function* valueMapperGenerator(ref_reducer_name, sort_field) {
  const reducer = yield getReducer(ref_reducer_name)
  const ref_list = reducer.get('ref_list')
  return a => {
    const id = a.get(sort_field)
    return ref_list.find(item => item.get('id') === id).get('display')
  }
}

const changeSortGenerator = (act_string, reducer) => {
  return function*() {
    yield takeLatest(act_string, handleSort, reducer)
  }
}

const changeFilterGenerator = (act_string, reducer) => {
  return function*() {
    yield takeLatest(act_string, loadFilteredAndSortedData, reducer)
  }
}

const saveNewGenerator = (act_string, reducer) => {
  return function*() {
    yield takeLatest(act_string, saveNewToDatabase, reducer)
  }
}

const saveEditGenerator = (act_string, reducer) => {
  return function*() {
    yield takeLatest(act_string, saveEditToDatabase, reducer)
  }
}

const doDeleteGenerator = (act_string, reducer) => {
  return function*() {
    yield takeLatest(act_string, deleteItem, reducer)
  }
}

// /******************************************************************************/
// /******************************* WATCHERS *************************************/
// /******************************************************************************/

const doLogin = function*() {
  yield takeLatest('ATTEMPT_LOGIN', attemptLogin)
}

const pageChangeWatcher = function*() {
  const forever = true
  while (forever) {
    yield take('PAGE_CHANGE')

    yield call(() => window.scrollTo(0, 0))

    const forks = []
    const page = yield getNewPage()
    const reducer_name = page.replace('/', '')
    const referenced_tables = (yield getReferenceTables(reducer_name)).toJS()
    const tables = Object.keys(referenced_tables).map(
      key => referenced_tables[key]
    )

    if (yield listIsDirty(reducer_name))
      forks.push(loadFilteredAndSortedData(reducer_name))

    for (let i = 0; i < tables.length; i++) {
      if (yield refListIsDirty(tables[i])) {
        forks.push(loadReferenceList(tables[i]))
      }
    }

    yield [forks]
  }
}

const table_watchers = table_names.map(name => {
  const forks = []

  // sort change
  let action = 'CHANGE_' + name.toUpperCase() + '_SORT'
  forks.push(fork(changeSortGenerator(action, name)))

  // filter change
  action = 'CHANGE_' + name.toUpperCase() + '_FILTER'
  forks.push(fork(changeFilterGenerator(action, name)))

  // save new
  action = 'DO_' + name.toUpperCase() + '_CREATE'
  forks.push(fork(saveNewGenerator(action, name)))

  // save edit
  action = 'DO_' + name.toUpperCase() + '_EDIT'
  forks.push(fork(saveEditGenerator(action, name)))

  // delete
  action = 'DO_' + name.toUpperCase() + '_DELETE'
  forks.push(fork(doDeleteGenerator(action, name)))

  return forks
})

// start watchers in parallel
export default function* root() {
  yield [fork(doLogin), fork(pageChangeWatcher), ...table_watchers]
}
