import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
	getCurrentRecord,
	getActionWord,
	getCurrentTabRows,
	getMode,
	getFieldDefinitions,
	refMatcher,
	getRefList
} from '../selectors'
import DetailsRow from './details_row'

const mstp = (state, ownProps) => ({
	current_tab_rows: getCurrentTabRows(state[ownProps.page]),
	current_record: getCurrentRecord(state[ownProps.page]),
	action_word: getActionWord(state[ownProps.page]),
	mode: getMode(state[ownProps.page]),
	field_definitions: getFieldDefinitions(state[ownProps.page]),

	ref_matchers: {
		ad_type: refMatcher(state['ad_types']),
		category: refMatcher(state['categories']),
		compensation_plan: refMatcher(state['compensation_plans']),
		customer: refMatcher(state['customers']),
		field: refMatcher(state['fields']),
		finding_line: refMatcher(state['finding_lines']),
		heading: refMatcher(state['headings']),
		local_foreign: refMatcher(state['local_foreigns']),
		order_line: refMatcher(state['order_lines']),
		order: refMatcher(state['orders']),
		order_status: refMatcher(state['order_statuses']),
		page_type: refMatcher(state['page_types']),
		pay_plan: refMatcher(state['pay_plans']),
		primary_book: refMatcher(state['primary_books']),
		sales_rep: refMatcher(state['sales_reps']),
		source_book: refMatcher(state['source_books']),
		udac: refMatcher(state['udacs'])
	},
	ref_lists: {
		ad_type: getRefList(state['ad_types']),
		category: getRefList(state['categories']),
		compensation_plan: getRefList(state['compensation_plans']),
		customer: getRefList(state['customers']),
		field: getRefList(state['fields']),
		finding_line: getRefList(state['finding_lines']),
		heading: getRefList(state['headings']),
		local_foreign: getRefList(state['local_foreigns']),
		order_line: getRefList(state['order_lines']),
		order: getRefList(state['orders']),
		order_status: getRefList(state['order_statuses']),
		page_type: getRefList(state['page_types']),
		pay_plan: getRefList(state['pay_plans']),
		primary_book: getRefList(state['primary_books']),
		sales_rep: getRefList(state['sales_reps']),
		source_book: getRefList(state['source_books']),
		udac: getRefList(state['udacs'])
	}
})

const DetailsWrapper = styled.div``

const DetailsLayout = (props) => {
	const { current_tab_rows, current_record } = props

	return current_record === null ? null : (
		<DetailsWrapper>
			{current_tab_rows.map((row, idx) => {
				return <DetailsRow key={idx} row_fields={row} {...props} />
			})}
		</DetailsWrapper>
	)
}

export default connect(mstp)(DetailsLayout)
