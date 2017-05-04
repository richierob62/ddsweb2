import React from 'react'
import { connect } from 'react-redux'
import act from '../actions/'
import * as sel from '../selectors'
import { buildPage } from '../page_utils/page_builder'

const state_part = 'customers'

const comp = props => buildPage(props)

const mapStateToProps = (state) => (
    {
        data: state[state_part],
        ref_hash: {
            sales_rep: sel.getDisplayValueFromID(state['sales_reps'].get('ref_list')),  
            category: sel.getDisplayValueFromID(state['categories'].get('ref_list')),
            local_foreign: sel.getDisplayValueFromID(state['local_foreigns'].get('ref_list')),
            pay_plan: sel.getDisplayValueFromID(state['pay_plans'].get('ref_list')),
            primary_book: sel.getDisplayValueFromID(state['primary_books'].get('ref_list'))
        },
        ref_lists: {
            sales_rep:  sel.getFilteredRefList(state['sales_reps']),  
            category: sel.getFilteredRefList(state['categories']),
            local_foreign: sel.getFilteredRefList(state['local_foreigns']),
            pay_plan: sel.getFilteredRefList(state['pay_plans']),
            primary_book: sel.getFilteredRefList(state['primary_books']),
        },
        typeaheads: {
            sales_rep:  state['sales_reps'].get('typeahead'),
            category: state['categories'].get('typeahead'),
            local_foreign: state['local_foreigns'].get('typeahead'),
            pay_plan: state['pay_plans'].get('typeahead'),
            primary_book: state['primary_books'].get('typeahead')
        },
        current: sel.getCurrent(state[state_part])
    }
)

const mapDispatchToProps = (dispatch) => ({ dispatch, act })

comp.propTypes = {
    data: React.PropTypes.object.isRequired,
    ref_hash: React.PropTypes.object,
    ref_lists: React.PropTypes.object,
    typeaheads: React.PropTypes.object,
    current: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(comp)