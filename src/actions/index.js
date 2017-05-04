import factory from './action_type_factory'
import {pageChange} from './general_actions'

const grouped_actions = Object.assign({},
    factory('ad_type'),
    factory('customer'),
    factory('order'),
    factory('primary_book'),
    factory('sales_rep'),
    factory('category'),
    factory('compensation_plan'),
    factory('field'),
    factory('finding_line'),
    factory('heading'),
    {pageChange}
)

export default grouped_actions






