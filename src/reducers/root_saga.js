import { take, put, call, fork, select, cancel } from 'redux-saga/effects'
import * as act from '../actions'
import * as api from '../api/api'

const paths = [
  {
    path: '/customers',
    refs: [
      'categories',
      'local_foreigns',
      'pay_plans',
      'primary_books',
      'sales_reps',
    ],
    list: 'customers'
  }
]

// 'CHANGE_XXX_FILTER'
// 'CHANGE_XXX_SORT'
// 'DELETE_XXX'
// 'PAGE_CHANGE'
// 'SAVE_DUPLICATE_XXX'
// 'SAVE_EDITED_XXX'
// 'SAVE_NEW_XXX'

// /* eslint-disable no-constant-condition */
// import actions, { resetTimer,
//   loadData,
//   dataLoaded,
//   resortRequired,
//   saveEditComplete,
//   saveNewComplete,
//   doDeleteComplete,
//   saveDuplicateComplete
// } from '../actions'
// import * as sel from '../reducer'
// import * as api from '../services'
// import entities from '../helpers/entities'


// // take = listen for action
// // fork = run gf non-blobking
// // put = dispatch action
// // call = call regular function
// // select = use reducer selector, passing state
// // cancel = cancel promise

// // Todo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// // 'LOAD_AND_SET_CURRENT',
// //    load record
// // 'LOAD_AND_SET_FILTER'
// //    load records
// // fire pageChange
// // browserHistory.push(new_page)    





// /******************************************************************************/
// /******************************* API LINK *************************************/
// /******************************************************************************/

function* loadReferenceList(name) {
  const apiCall = 'loadReferenceList_' + name.toUpperCase()
  const { response } = yield call(api[apiCall])
  if (response) {
    yield put(act['refListLoaded_' + name.toUpperCase()](response))
  }
}

function* loadList(name) {
  const apiCall = 'loadList_' + name.toUpperCase()
  const filters = select()[name].get('current_filters').toJS()
  const sort = select()[name].get('current_sort').toJS()
  const { response } = yield call(api[apiCall](filters, sort))
  if (response) {
    yield put(act['listLoaded' + name.toUpperCase()](response))
  }
}

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


// /******************************************************************************/
// /******************************* WATCHERS *************************************/
// /******************************************************************************/

const pageChangeWatcher = function* () {
  while (true) {
    yield take(act['pageChange'])
    let forks = []
    const new_path = yield select()['pageChange'].get('current_path')
    const path_obj = paths.find(obj => obj.path === new_path)
    if (path_obj) {
      forks = path_obj.refs.map(ref => {
        return fork(loadReferenceList(ref))
      })
      forks.push(loadList(path_obj.list))
    }
    yield [forks]
  }
}


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


// start watchers in parallel
export default function* root() {
  yield [
    fork(pageChangeWatcher)
  ]
}






