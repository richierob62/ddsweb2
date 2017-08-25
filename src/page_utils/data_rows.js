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
	refSelector
} from '../selectors'

const mstp = (state, ownProps) => {
	return {
		list: getFilteredList(state[ownProps.page]),
		field_definitions: getFieldDefinitions(state[ownProps.page]),
		list_template: getListTemplate(state[ownProps.page]),
		action_word: getActionWord(state[ownProps.page]),
		selected_id: getSelectedID(state[ownProps.page]),
		ref_selector_ad_type: refSelector(state['ad_types']),
		ref_selector_category: refSelector(state['categories']),
		ref_selector_compensation_plan: refSelector(state['compensation_plans']),
		ref_selector_customer: refSelector(state['customers']),
		ref_selector_field: refSelector(state['fields']),
		ref_selector_finding_line: refSelector(state['finding_lines']),
		ref_selector_heading: refSelector(state['headings']),
		ref_selector_local_foreign: refSelector(state['local_foreigns']),
		ref_selector_order_line: refSelector(state['order_lines']),
		ref_selector_order: refSelector(state['orders']),
		ref_selector_order_status: refSelector(state['order_statuses']),
		ref_selector_page_type: refSelector(state['page_types']),
		ref_selector_pay_plan: refSelector(state['pay_plans']),
		ref_selector_primary_book: refSelector(state['primary_books']),
		ref_selector_sales_rep: refSelector(state['sales_reps']),
		ref_selector_source_book: refSelector(state['source_books']),
		ref_selector_udac: refSelector(state['udacs'])
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
				disp_obj = props.ref_selector_ad_type(line.get('ad_type_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'category':
				disp_obj = props.ref_selector_category(line.get('category_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'compensation_plan':
				disp_obj = props.ref_selector_compensation_plan(line.get('compensation_plan_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'customer':
				disp_obj = props.ref_selector_customer(line.get('customer_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'field':
				disp_obj = props.ref_selector_field(line.get('field_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'finding_line':
				disp_obj = props.ref_selector_finding_line(line.get('finding_line_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'heading':
				disp_obj = props.ref_selector_heading(line.get('heading_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'local_foreign':
				disp_obj = props.ref_selector_local_foreign(line.get('local_foreign_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'order_line':
				disp_obj = props.ref_selector_order_line(line.get('order_line_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'order':
				disp_obj = props.ref_selector_order(line.get('order_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'order_status':
				disp_obj = props.ref_selector_order_status(line.get('order_status_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'page_type':
      disp_obj = props.ref_selector_page_type(line.get('page_type_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'pay_plan':
				disp_obj = props.ref_selector_pay_plan(line.get('pay_plan_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'primary_book':
				disp_obj = props.ref_selector_primary_book(line.get('primary_book_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'sales_rep':
				disp_obj = props.ref_selector_sales_rep(line.get('sales_rep_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'source_book':
				disp_obj = props.ref_selector_source_book(line.get('source_book_id'))
				return disp_obj ? disp_obj.get('display') : loading
			case 'udac':
				disp_obj = props.ref_selector_udac(line.get('udac_id'))
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
