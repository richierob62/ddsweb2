// take = listen for action
// fork = run gf non-blocking
// put = dispatch action
// call = call regular function
// select = use reducer selector, passing state
// cancel = cancel promise

import { take, put, call, fork, select } from 'redux-saga/effects'
import act from '../actions'


// /******************************************************************************/
// /********************************* CONFIG *************************************/
// /******************************************************************************/

const domain = 'http://ddsweb-api.app/'

const table_hash = {
  customer: { reducer: 'customers' },
  category: { reducer: 'categories' },
  pay_plan: { reducer: 'pay_plans' },
  local_foreign: { reducer: 'local_foreigns' },
  primary_book: { reducer: 'primary_books' },
  sales_rep: { reducer: 'sales_reps' },
}

// /******************************************************************************/
// /********************** API CALLING MACHINE ***********************************/
// /******************************************************************************/

const statusHelper = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response))
  }
}

const postApi = (uri, payload) => {

  const headers = new Headers()
  headers.append('Content-Type', 'application/json');

  const body = JSON.stringify(payload)

  return fetch(uri, { headers, method: 'POST', body })
    .then(statusHelper)
    .then(response => response.json())
};


// /******************************************************************************/
// /********************** SIDE EFFECT CENTRAL ***********************************/
// /******************************************************************************/


function* loadReferenceList(table) {

  const reducer = table_hash[table].reducer
  const url = domain + table + '_reference'
  const action_word = yield getActionWord(reducer)

  const { data } = yield call(postApi, url)

  const closing_action = 'load' + action_word + 'ReferenceCompleted'
  yield put(act[closing_action](data))

}

function* loadFilteredAndSortedData(table) {

  const reducer = table_hash[table].reducer
  const url = domain + reducer
  const filters = yield getFilters(reducer)
  const sort_name = yield getSortName(reducer)
  const sort_dir = yield getSortDir(reducer)
  const action_word = yield getActionWord(reducer)
  const { data } = yield call(postApi, url, { filters, sort_name, sort_dir })

  const closing_action = 'load' + action_word + 'ListCompleted'
  yield put(act[closing_action](data))


}


// /******************************************************************************/
// /******************************* SELECTORS *************************************/
// /******************************************************************************/

function* getNewPage() {
  const state = yield select(s => s['pageChange'])
  return state.get('current_path')
}

function* getFilters(reducer) {
  const state = yield select(s => s[reducer])
  return state.get('current_filters').toJS()
}

function* getActionWord(reducer) {
  const state = yield select(s => s[reducer])
  return state.get('action_word')
}

function* getSortName(reducer) {
  const state = yield select(s => s[reducer])
  return state.getIn(['current_sort', 'field_name'])
}

function* listIsDirty(reducer) {
  const state = yield select(s => s[reducer])
  return state.get('list_dirty')
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

// /******************************************************************************/
// /************************** FUNCTION GENERATORS *******************************/
// /******************************************************************************/

function* valueMapperGenerator(reducer_name, sort_field) {
  const reducer = yield getReducer(reducer_name)
  const ref_list = reducer.get('ref_list')
  return (a) => {
    const id = a.get(sort_field)
    return ref_list.find(item => item.get('id') === id).get('display')
  }
}

const changeSortGenerator = (reducer_string, act_string) => {

  return function* () {
    const forever = true
    while (forever) {

      const action = yield take(act_string)

      const prev_sorted_on = yield getSortName(reducer_string)
      const prev_sorted_dir = yield getSortDir(reducer_string)

      const new_sort_field = action.payload

      const ref_table_name = yield getReferenceTableName(reducer_string, new_sort_field)

      const reducer_name = (ref_table_name !== undefined) ? table_hash[ref_table_name].reducer : undefined

      let valueMapper
      if (reducer_name === undefined)
        valueMapper = a => a.get(new_sort_field)
      else
        valueMapper = yield valueMapperGenerator(reducer_name, new_sort_field + '_id')

      const new_direction = action.payload === prev_sorted_on
        ? (prev_sorted_dir === 'ASC'
          ? 'DESC'
          : 'ASC')
        : 'ASC'

      const sortFunc = (a, b) => {
        const multiplier = new_direction === 'ASC' ? 1 : -1
        if (a < b) { return -1 * multiplier }
        if (a > b) { return 1 * multiplier }
        if (a === b) { return 0 }
      }

      const sorted_list = (yield getFilteredList(reducer_string)).sortBy(valueMapper, sortFunc)

      const payload = {
        reducer: reducer_string,
        list: sorted_list,
        field_name: new_sort_field,
        direction: new_direction
      }

      yield put(act.sortChangeCompleted(payload))

    }
  }
}

// /******************************************************************************/
// /******************************* WATCHERS *************************************/
// /******************************************************************************/

const pageChangeWatcher = function* () {

  const forever = true
  while (forever) {

    yield take('PAGE_CHANGE')

    let reducer;
    const forks = []
    // which page?
    const page = yield getNewPage();

    switch (page) {

      case '/customers':

        // list dirty?
        reducer = table_hash['customer'].reducer
        if (yield listIsDirty(reducer)) {

          // main file
          forks.push(loadFilteredAndSortedData('customer'))

          // reference lists
          if (yield refListIsDirty('sales_reps')) { forks.push(loadReferenceList('sales_rep')) }
          if (yield refListIsDirty('categories')) forks.push(loadReferenceList('category'))
          if (yield refListIsDirty('local_foreigns')) forks.push(loadReferenceList('local_foreign'))
          if (yield refListIsDirty('pay_plans')) forks.push(loadReferenceList('pay_plan'))
          if (yield refListIsDirty('primary_books')) forks.push(loadReferenceList('primary_book'))

        }

        break

    }

    yield [forks]
  }
}

const changeCustomerSort = changeSortGenerator('customers', 'CHANGE_CUSTOMER_SORT')


// start watchers in parallel
export default function* root() {
  yield [
    fork(pageChangeWatcher),
    fork(changeCustomerSort),
  ]
}
