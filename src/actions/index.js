import factory from './action_type_factory'
import table_names from '../reducers/table_list'
import {
  pageChange,
  sortChangeCompleted,
  closeModal,
  beginLogin,
  attemptLogin,
  authFail,
  authSuccess,
  clearLoginError,
  checkSleep
} from './general_actions'

const table_actions = table_names
  .map(name => factory(name))
  .reduce((acc, obj) => Object.assign(acc, obj), {})

const grouped_actions = Object.assign(
  {},
  table_actions,
  { pageChange },
  { sortChangeCompleted },
  { closeModal },
  { beginLogin },
  { attemptLogin },
  { authFail },
  { authSuccess },
  { clearLoginError },
  { checkSleep }
)

export default grouped_actions
