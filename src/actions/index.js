import factory from "./action_type_factory";
import {
  pageChange,
  sortChangeCompleted,
  closeModal,
  beginLogin,
  attemptLogin,
  authFail,
  authSuccess,
  clearLoginError,
  checkSleep,
} from "./general_actions";

const grouped_actions = Object.assign(
  {},
  factory("ad_type"),
  factory("customer"),
  factory("order"),
  factory("order_line"),
  factory("order_status"),
  factory("pay_plan"),
  factory("primary_book"),
  factory("sales_rep"),
  factory("category"),
  factory("compensation_plan"),
  factory("field"),
  factory("finding_line"),
  factory("heading"),
  factory("local_foreign"),
  factory("source_book"),
  factory("udac"),
  { pageChange },
  { sortChangeCompleted },
  { closeModal },
  { beginLogin },
  { attemptLogin },
  { authFail },
  { authSuccess },
  { clearLoginError },
  { checkSleep },
);

export default grouped_actions;
