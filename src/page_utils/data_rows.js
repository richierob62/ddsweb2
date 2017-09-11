import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import actions from '../actions'
import {
	getSelectedID,
	getFieldDefinitions,
	getListTemplate,
	getActionWord,
	getFilteredList,
	refMatcher
} from '../selectors'

const mstp = (state, ownProps) => {
	return {
		list: getFilteredList(state[ownProps.page]),
		field_definitions: getFieldDefinitions(state[ownProps.page]),
		list_template: getListTemplate(state[ownProps.page]),
		action_word: getActionWord(state[ownProps.page]),
		selected_id: getSelectedID(state[ownProps.page]),
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
		}
	}
}

const WrappingTBody = styled.tbody`border-bottom: 1px solid #8e44ad;`

const DataLine = styled.tr`
	background-color: ${({ selected }) => (selected ? 'rgba(44, 62, 80, 0.65)' : 'white')};
	color: ${({ selected }) => (selected ? 'white' : 'black')};
	height: 30px;

	&:hover {
		color: ${({ selected }) => (selected ? 'white' : '#2f2f2f')};
		background-color: ${({ selected }) => (selected ? 'rgba(44, 62, 80, 0.65)' : 'rgba(189, 195, 199, 0.35)')};
	}
`

const DataCell = styled.td`
	width: ${({ width }) => width};
	font-size: .7rem;
	padding-left: .9rem;
`

const DataRows = (props) => {
	const { dispatch, list, field_definitions, list_template, selected_id, action_word } = props

	// select_handler
	const select_handler_action_name = 'select' + action_word
	const select_handler = (payload) => dispatch(actions[select_handler_action_name](payload))

	const fixReferenceFields = (line, column) => {
		const ref_table = field_definitions.getIn([ column.get('field_name'), 'ref_table' ])

		if (ref_table === undefined) return line.get(column.get('field_name'))

		let disp_obj
		const loading = 'loading...'
		switch (ref_table) {
			case 'ad_type':
				disp_obj = props.ref_matchers.ad_type(line.get('ad_type_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'category':
				disp_obj = props.ref_matchers.category(line.get('category_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'compensation_plan':
				disp_obj = props.ref_matchers.compensation_plan(line.get('compensation_plan_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'customer':
				disp_obj = props.ref_matchers.customer(line.get('customer_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'field':
				disp_obj = props.ref_matchers.field(line.get('field_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'finding_line':
				disp_obj = props.ref_matchers.finding_line(line.get('finding_line_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'heading':
				disp_obj = props.ref_matchers.heading(line.get('heading_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'local_foreign':
				disp_obj = props.ref_matchers.local_foreign(line.get('local_foreign_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'order_line':
				disp_obj = props.ref_matchers.order_line(line.get('order_line_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'order':
				disp_obj = props.ref_matchers.order(line.get('order_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'order_status':
				disp_obj = props.ref_matchers.order_status(line.get('order_status_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'page_type':
				disp_obj = props.ref_matchers.page_type(line.get('page_type_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'pay_plan':
				disp_obj = props.ref_matchers.pay_plan(line.get('pay_plan_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'primary_book':
				disp_obj = props.ref_matchers.primary_book(line.get('primary_book_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'sales_rep':
				disp_obj = props.ref_matchers.sales_rep(line.get('sales_rep_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'source_book':
				disp_obj = props.ref_matchers.source_book(line.get('source_book_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'udac':
				disp_obj = props.ref_matchers.udac(line.get('udac_id'))
				return disp_obj ? disp_obj.get('display') : loading
			default:
				return ''
		}
	}

	return (
		<WrappingTBody>
			{list.map((line) => {
				return (
					<DataLine
						key={line.get('id')}
						selected={line.get('id') === selected_id}
						onClick={select_handler.bind(null, line.get('id'))}
					>
						{list_template.map((column) => {
							return (
								<DataCell key={line.get('id') + column.get('field_name')} width={column.get('width')}>
									{fixReferenceFields(line, column)}
								</DataCell>
							)
						})}
					</DataLine>
				)
			})}
		</WrappingTBody>
	)
}

export default connect(mstp)(DataRows)
