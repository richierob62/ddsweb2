import React from 'react'
import { connect } from 'react-redux'
import * as act from '../actions'
import * as sel from '../selectors'
import { buildPage } from '../utils/page_builder'

const state_part = 'customers'

const comp = props => buildPage(props)

const mapStateToProps = (state) => (
    {
        data: state[state_part],
        ref_hash: {
            sales_rep: sel.getDisplayValueFromID(state['sales_reps'].get('ref_list'))
        },
        ref_lists: {
            sales_rep: state['sales_reps'].get('ref_list').toJS()
        },        
        current: sel.getCurrent(state[state_part])
    }
)

const mapDispatchToProps = (dispatch) => ({ dispatch, act })

export default connect(mapStateToProps, mapDispatchToProps)(comp)