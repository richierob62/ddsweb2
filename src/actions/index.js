import factory from './action_type_factory'
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

const grouped_actions = Object.assign(
	{},
	factory('ad_type'),
	factory('category'),
	factory('compensation_plan'),
	factory('customer'),
	factory('field'),
	factory('finding_line'),
	factory('heading'),
	factory('local_foreign'),
	factory('order'),
	factory('order_line'),
	factory('order_status'),
	factory('page_type'),
	factory('pay_plan'),
	factory('primary_book'),
	factory('sales_rep'),
	factory('source_book'),
	factory('udac'),
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
