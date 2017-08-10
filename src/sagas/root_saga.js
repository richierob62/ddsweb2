// take = listen for action
// fork = run gf non-blocking
// put = dispatch action
// call = call regular function
// select = use reducer selector, passing state
// cancel = cancel promise

import { take, put, call, fork, select, takeLatest } from "redux-saga/effects";
import act from "../actions";
import { getCurrentRecord, getSelectedID } from "../selectors";

// /******************************************************************************/
// /********************************* CONFIG *************************************/
// /******************************************************************************/

const domain = "http://ddsweb-api.app/";

const table_hash = {
  customer: { reducer: "customers" },
  category: { reducer: "categories" },
  pay_plan: { reducer: "pay_plans" },
  local_foreign: { reducer: "local_foreigns" },
  primary_book: { reducer: "primary_books" },
  sales_rep: { reducer: "sales_reps" }
};

// /******************************************************************************/
// /********************** API CALLING MACHINE ***********************************/
// /******************************************************************************/

const statusHelper = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response));
  }
};

const postApi = (uri, payload, token) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  headers.append("Api-Token", token);

  const body = JSON.stringify(payload);

  return fetch(uri, { headers, method: "POST", body })
    .then(statusHelper)
    .then(response => response.json());
};

// /******************************************************************************/
// /********************** SIDE EFFECT CENTRAL ***********************************/
// /******************************************************************************/

function* loadReferenceList(table) {
  const reducer = table_hash[table].reducer;
  const url = domain + table + "_reference";
  const action_word = yield getActionWord(reducer);

  const token = yield getToken();

  const { data } = yield call(postApi, url, {}, token);

  const closing_action = "load" + action_word + "ReferenceCompleted";
  yield put(act[closing_action](data));
}

function* loadFilteredAndSortedData(table) {
  const reducer = table_hash[table].reducer;
  const url = domain + reducer;
  const sort_name = yield getSortName(reducer);
  const sort_dir = yield getSortDir(reducer);
  const filters = yield getFilters(reducer);
  const action_word = yield getActionWord(reducer);
  const token = yield getToken();
  const { data } = yield call(
    postApi,
    url,
    { filters, sort_name, sort_dir },
    token
  );
  const closing_action = "load" + action_word + "ListCompleted";
  yield put(act[closing_action](data));
}

function* saveNewToDatabase(table) {
  const reducer = table_hash[table].reducer;
  const url = domain + "new_" + table;

  // get data to save
  const payload = (yield getRecordToSave(reducer)).toJS();
  delete payload["id"];

  // get a new account number
  const acc_num = yield getNextCustomerAccountNumber();
  payload.account_num = acc_num;

  const action_word = yield getActionWord(reducer);
  const token = yield getToken();
  const returned = yield call(postApi, url, payload, token);
  let closing_action;
  if (returned.errors) {
    closing_action = "save" + action_word + "Failed";
    yield put(act[closing_action](returned.errors));
  } else {
    closing_action = "save" + action_word + "Completed";
    yield put(act[closing_action](returned.data));
  }
}

function* saveEditToDatabase(table) {
  const reducer = table_hash[table].reducer;
  const url = domain + "edit_" + table;

  // get data to save
  const payload = (yield getRecordToSave(reducer)).toJS();
  Object.keys(payload).map(key => {
    if (!payload[key]) payload[key] = "";
    return null;
  });
  const action_word = yield getActionWord(reducer);
  const token = yield getToken();
  const returned = yield call(postApi, url, payload, token);

  let closing_action;
  if (returned.errors) {
    closing_action = "save" + action_word + "Failed";
    yield put(act[closing_action](returned.errors));
  } else {
    closing_action = "save" + action_word + "Completed";
    yield put(act[closing_action](returned.data));
  }
}

function* deleteItem(table) {
  const reducer = table_hash[table].reducer;
  const url = domain + "delete_" + table;

  // get data to save
  const payload = { id: yield getIdOfRecordToDelete(reducer) };

  const action_word = yield getActionWord(reducer);
  const token = yield getToken();
  const returned = yield call(postApi, url, payload, token);

  let closing_action;
  if (returned.errors) {
    closing_action = "delete" + action_word + "Failed";
    yield put(act[closing_action](returned.errors));
  } else {
    closing_action = "delete" + action_word + "Completed";
    yield put(act[closing_action](returned.data));
  }
}

function* getNextCustomerAccountNumber() {
  const url = domain + "next_customer_number";
  const token = yield getToken();
  return yield call(postApi, url, {}, token);
}

function* attemptLogin(action) {
  const payload = {
    email: action.payload.email,
    password: action.payload.pass
  };
  const url = domain + "login";
  const returned = yield call(postApi, url, payload);

  let closing_action;
  if (returned.error) {
    closing_action = "authFail";
    yield put(act[closing_action]({ message: returned.error }));
  } else {
    closing_action = "authSuccess";
    yield put(act[closing_action](returned.data));
    yield gotoOriginalDestination();
  }
}

function* handleSort(table, action) {
  const reducer = table_hash[table].reducer;
  const prev_sorted_on = yield getSortName(reducer);
  const prev_sorted_dir = yield getSortDir(reducer);
  const new_sort_field = action.payload;
  const ref_table_name = yield getReferenceTableName(reducer, new_sort_field);
  const ref_reducer_name = ref_table_name !== undefined
    ? table_hash[ref_table_name].reducer
    : undefined;

  let valueMapper;
  if (ref_reducer_name === undefined) valueMapper = a => a.get(new_sort_field);
  else
    valueMapper = yield valueMapperGenerator(
      ref_reducer_name,
      new_sort_field + "_id"
    );

  const new_direction = action.payload === prev_sorted_on
    ? prev_sorted_dir === "ASC" ? "DESC" : "ASC"
    : "ASC";

  const sortFunc = (a, b) => {
    const first = a.toUpperCase();
    const second = b.toUpperCase();
    const multiplier = new_direction === "ASC" ? 1 : -1;
    if (first < second) {
      return -1 * multiplier;
    }
    if (first > second) {
      return 1 * multiplier;
    }
    if (first === second) {
      return 0;
    }
  };

  const sorted_list = (yield getFilteredList(reducer)).sortBy(
    valueMapper,
    sortFunc
  );

  const payload = {
    reducer: reducer,
    list: sorted_list,
    field_name: new_sort_field,
    direction: new_direction
  };

  yield put(act.sortChangeCompleted(payload));
}

// /******************************************************************************/
// /******************************* SELECTORS *************************************/
// /******************************************************************************/

function* getNewPage() {
  const state = yield select(s => s["pageChange"]);
  return state.get("current_path");
}

function* getToken() {
  const state = yield select(s => s["auth"]);
  return state.get("token");
}

function* getFilters(reducer) {
  const state = yield select(s => s[reducer]);
  return state.get("current_filters").toJS();
}

function* getActionWord(reducer) {
  const state = yield select(s => s[reducer]);
  return state.get("action_word");
}

function* getSortName(reducer) {
  const state = yield select(s => s[reducer]);
  return state.getIn(["current_sort", "field_name"]);
}

function* listIsDirty(reducer) {
  const state = yield select(s => s[reducer]);
  return state.get("list_dirty");
}

function* refListIsDirty(reducer) {
  const state = yield select(s => s[reducer]);
  return state.get("ref_list_dirty");
}

function* getSortDir(reducer) {
  const state = yield select(s => s[reducer]);
  return state.getIn(["current_sort", "direction"]);
}

function* getReferenceTableName(reducer, field_name) {
  const state = yield select(s => s[reducer]);
  return state.getIn(["fields", field_name, "ref_table"]);
}

function* getReducer(reducer) {
  return yield select(s => s[reducer]);
}

function* getFilteredList(reducer) {
  const state = yield select(s => s[reducer]);
  return state.get("list");
}

function* getRecordToSave(reducer) {
  const state = yield select(s => s[reducer]);
  return getCurrentRecord(state);
}

function* getIdOfRecordToDelete(reducer) {
  const state = yield select(s => s[reducer]);
  return getSelectedID(state);
}

function* gotoOriginalDestination() {
  const state = yield select(s => s["auth"]);
  const history_obj = state.get("history_obj");
  const dest = state.get("next_page");
  history_obj.push(dest);
  return null;
}

// /******************************************************************************/
// /************************** FUNCTION GENERATORS *******************************/
// /******************************************************************************/

function* valueMapperGenerator(ref_reducer_name, sort_field) {
  const reducer = yield getReducer(ref_reducer_name);
  const ref_list = reducer.get("ref_list");
  return a => {
    const id = a.get(sort_field);
    return ref_list.find(item => item.get("id") === id).get("display");
  };
}

const changeSortGenerator = (act_string, table) => {
  return function*() {
    yield takeLatest(act_string, handleSort, table);
  };
};

const changeFilterGenerator = (act_string, table) => {
  return function*() {
    yield takeLatest(act_string, loadFilteredAndSortedData, table);
  };
};

const saveNewGenerator = (act_string, table) => {
  return function*() {
    yield takeLatest(act_string, saveNewToDatabase, table);
  };
};

const saveEditGenerator = (act_string, table) => {
  return function*() {
    yield takeLatest(act_string, saveEditToDatabase, table);
  };
};

const doDeleteGenerator = (act_string, table) => {
  return function*() {
    yield takeLatest(act_string, deleteItem, table);
  };
};

// /******************************************************************************/
// /******************************* WATCHERS *************************************/
// /******************************************************************************/

const doLogin = function*() {
  yield takeLatest("ATTEMPT_LOGIN", attemptLogin);
};

const pageChangeWatcher = function*() {
  const forever = true;
  while (forever) {
    yield take("PAGE_CHANGE");

    let reducer;
    const forks = [];
    // which page?
    const page = yield getNewPage();

    switch (page) {
      case "/customers":
        // list dirty?
        reducer = table_hash["customer"].reducer;
        if (yield listIsDirty(reducer)) {
          // main file
          forks.push(loadFilteredAndSortedData("customer"));

          // reference lists
          if (yield refListIsDirty("sales_reps")) {
            forks.push(loadReferenceList("sales_rep"));
          }
          if (yield refListIsDirty("categories"))
            forks.push(loadReferenceList("category"));
          if (yield refListIsDirty("local_foreigns"))
            forks.push(loadReferenceList("local_foreign"));
          if (yield refListIsDirty("pay_plans"))
            forks.push(loadReferenceList("pay_plan"));
          if (yield refListIsDirty("primary_books"))
            forks.push(loadReferenceList("primary_book"));
        }

        break;

      default:
        // list dirty?
        reducer = table_hash["customer"].reducer;
        if (yield listIsDirty(reducer)) {
          // main file
          forks.push(loadFilteredAndSortedData("customer"));

          // reference lists
          if (yield refListIsDirty("sales_reps")) {
            forks.push(loadReferenceList("sales_rep"));
          }
          if (yield refListIsDirty("categories"))
            forks.push(loadReferenceList("category"));
          if (yield refListIsDirty("local_foreigns"))
            forks.push(loadReferenceList("local_foreign"));
          if (yield refListIsDirty("pay_plans"))
            forks.push(loadReferenceList("pay_plan"));
          if (yield refListIsDirty("primary_books"))
            forks.push(loadReferenceList("primary_book"));
        }

        break;
    }

    yield [forks];
  }
};

const changeCustomerSort = changeSortGenerator(
  "CHANGE_CUSTOMER_SORT",
  "customer"
);

const changeCustomerFilter = changeFilterGenerator(
  "CHANGE_CUSTOMER_FILTER",
  "customer"
);

const saveNewCustomer = saveNewGenerator("DO_CUSTOMER_CREATE", "customer");

const saveEditCustomer = saveEditGenerator("DO_CUSTOMER_EDIT", "customer");

const doCustomerDelete = doDeleteGenerator("DO_CUSTOMER_DELETE", "customer");

// start watchers in parallel
export default function* root() {
  yield [
    fork(pageChangeWatcher),
    fork(changeCustomerSort),
    fork(changeCustomerFilter),
    fork(saveNewCustomer),
    fork(saveEditCustomer),
    fork(doCustomerDelete),
    fork(doLogin)
  ];
}
