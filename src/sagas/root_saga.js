// take = listen for action
// fork = run gf non-blocking
// put = dispatch action
// call = call regular function
// select = use reducer selector, passing state
// cancel = cancel promise

import { take, put, call, fork, select, cancel } from 'redux-saga/effects'
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


// /******************************************************************************/
// /******************************* WATCHERS *************************************/
// /******************************************************************************/

const pageChangeWatcher = function* () {

  const forever = true
  while (forever) {

    yield take(act.pageChange().type)

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

        break;

    }

    yield [forks]
  }
}


// start watchers in parallel
export default function* root() {
  yield [
    fork(pageChangeWatcher)
  ]
}




// function* loadList(name) {
//   const apiCall = 'loadList_' + name.toUpperCase()
//   const filters = select()[name].get('current_filters').toJS()
//   const sort = select()[name].get('current_sort').toJS()
//   const { response } = yield call(api[apiCall](filters, sort))
//   if (response) {
//     yield put(act['listLoaded' + name.toUpperCase()](response))
//   }
// }

// const generateListLoader = (entity) => {
//   let table = entity.toLowerCase()
//   let apiCall = 'get_' + table + '_list'
//   return function* loader() {
//     // invoke a selector on the current Store's state
//     const loadtime = yield select(sel.getLastCallTime, table)
//     if (dataIsStale(loadtime)) {
//       // dispatch an action to the Store
//       yield put(loadData(table))
//       // call the function with arguments
//       const filters = yield select(sel.getFilters, table)
//       const { response } = yield call(api[apiCall], filters)
//       if (response) {
//         // dispatch actions to the Store
//         yield put(dataLoaded(table, response))
//         yield put(resortRequired(table))
//       }
//       else {
//         // dispatch an action to the Store
//       }
//     }
//     else {
//       // data is fresh
//     }
//   }
// }

// const generateSaveEdit = (entity) => {
//   let table = entity.toLowerCase()
//   let apiCall = 'save_' + table + '_record'
//   return function* record_saver() {
//     const currentItem = yield select(sel.getCurrentItem, table)
//     const { response, error } = yield call(api[apiCall], currentItem)
//     if (response) {
//       yield put(saveEditComplete(table, response))
//       yield put(resortRequired(table))
//     }
//     // else {
//     //   // yield put( recordSaveError(table, error) )
//     // }
//   }
// }

// const generateSaveNew = (entity) => {
//   let table = entity.toLowerCase()
//   let apiCall = 'save_new_' + table + '_record'
//   return function* new_record_saver() {
//     const currentItem = yield select(sel.getCurrentItem, table)
//     const { response, error } = yield call(api[apiCall], currentItem)
//     if (response) {
//       yield put(saveNewComplete(table, response))
//       yield put(resortRequired(table))
//     }
//     // else {
//     //   // yield put( recordSaveError(table, error) )
//     // }
//   }
// }

// const generateSaveDuplicate = (entity) => {
//   let table = entity.toLowerCase()
//   let apiCall = 'save_duplicate_' + table + '_record'
//   return function* new_record_saver() {
//     const currentItem = yield select(sel.getCurrentItem, table)
//     const { response, error } = yield call(api[apiCall], currentItem)
//     if (response) {
//       yield put(saveDuplicateComplete(table, response))
//       yield put(resortRequired(table))
//     }
//     // else {
//     //   // yield put( recordSaveError(table, error) )
//     // }
//   }
// }

// const generateDoDelete = (entity) => {
//   let table = entity.toLowerCase()
//   let apiCall = 'delete_' + table + '_record'
//   return function* record_deleter() {
//     const currentID = yield select(sel.getCurrentID, table)
//     const { response, error } = yield call(api[apiCall], currentID)
//     if (response) {
//       yield put(doDeleteComplete(table, response))
//     }
//     // else {
//     //   // yield put( recordSaveError(table, error) )
//     // }
//   }
// }

// const MAX_WAIT = 60 * 1000
// const dataIsStale = (time) => (time < 0 || (new Date()).getTime() - time > MAX_WAIT)







// const temp_watchers = tables.reduce((acc, table) => {
//   return acc.concat(table.refs).concat([table.name])
// }, [])
//   .map(table => table.toUpperCase())
//   .filter((table, index, list) => {
//     const head = list.slice(0, index)
//     return head.indexOf(table) < 0
//   })

// entities.forEach(entity => {

//   const entity_name = entity.name.toUpperCase()
//   const dependencies = entity.dependencies

//   // RESPOND TO LOAD PAGE ACTION
//   // ===================================================================================
//   const load_xxx_page = entity_name + '_LOAD_PAGE'
//   const load_xxx_list = fork(generateListLoader(entity_name))
//   const load_xxx_dependencies = dependencies.map((dep) => {
//     return fork(generateListLoader(dep))
//   })
//   load_xxx_dependencies.push(load_xxx_list)
//   watchers.push(
//     function* () {
//       while (true) {
//         yield take(actions[load_xxx_page])
//         yield [load_xxx_dependencies]
//       }
//     }
//   )

//   // RESPOND TO FILTER CHANGE
//   // ===================================================================================
//   const xxx_filter_change = entity_name + '_FILTER_CHANGE'
//   const clear_xxx_filter = entity_name + '_CLEAR_FILTER'
//   watchers.push(
//     function* () {
//       let lastTask
//       while (true) {
//         yield take([actions[xxx_filter_change], actions[clear_xxx_filter]])
//         if (lastTask) yield cancel(lastTask)
//         yield put(resetTimer(entity.name))
//         lastTask = yield fork(load_xxx_list)
//       }
//     }
//   )

//   // RESPOND TO SAVE EDIT
//   // ===================================================================================
//   const xxx_save_edit = entity_name + '_SAVE_EDIT'
//   const save_xxx_record = generateSaveEdit(entity_name)
//   watchers.push(
//     function* () {
//       while (true) {
//         yield take(actions[xxx_save_edit])
//         yield fork(save_xxx_record)
//       }
//     }
//   )

//   // RESPOND TO SAVE NEW
//   // ===================================================================================
//   const xxx_save_new = entity_name + '_SAVE_NEW'
//   const save_new_xxx_record = generateSaveNew(entity_name)
//   watchers.push(
//     function* () {
//       while (true) {
//         yield take(actions[xxx_save_new])
//         yield fork(save_new_xxx_record)
//       }
//     }
//   )

//   // RESPOND TO SAVE DUPLICACTE
//   // ===================================================================================
//   const xxx_save_duplicate = entity_name + '_SAVE_DUPLICATE'
//   const save_duplicate_xxx_record = generateSaveDuplicate(entity_name)
//   watchers.push(
//     function* () {
//       while (true) {
//         yield take(actions[xxx_save_duplicate])
//         yield fork(save_duplicate_xxx_record)
//       }
//     }
//   )

//   // RESPOND TO DELETE
//   // ===================================================================================
//   const xxx_do_delete = entity_name + '_DO_DELETE'
//   const delete_xxx_record = generateDoDelete(entity_name)
//   watchers.push(
//     function* () {
//       while (true) {
//         yield take(actions[xxx_do_delete])
//         yield fork(delete_xxx_record)
//       }
//     }
//   )

// })









