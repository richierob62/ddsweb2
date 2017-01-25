import React from 'react'
import { connect } from 'react-redux'
import * as act from '../actions'
import * as sel from '../selectors'
import { buildPage } from '../utils/page_builder'

const state_part = 'customers'

const comp = (props) => buildPage(props)

const mapStateToProps = (state) => (
    {
        data: state[state_part],
        ref_hash: {
            sales_rep: sel.getDisplayValueFromID(state['sales_reps'].get('ref_list'))
        }
    }
)

const mapDispatchToProps = (dispatch) => ({ dispatch, act })

comp.propTypes = {
  data: React.PropTypes.object.isRequired,
  ref_hash: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(comp)