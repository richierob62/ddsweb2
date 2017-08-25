import React from 'react'
import styled from 'styled-components'

import TextInput from './text_input'
import SelectInput from './select_input'
import DateInput from './date_input'
import RadioInput from './radio_input'
import CheckboxInput from './checkbox_input'

const FieldWrapper = styled.div`
    flex: 1
    margin-top: 9px
    margin-bottom: 3px
`

const identifyRefFunctionFromRefTableName = (name, props) => {
	switch (name) {
		case 'ad_type':
			return props.ref_selector_ad_type
		case 'category':
			return props.ref_selector_category
		case 'compensation_plan':
			return props.ref_selector_compensation_plan
		case 'customer':
			return props.ref_selector_customer
		case 'field':
			return props.ref_selector_field
		case 'finding_line':
			return props.ref_selector_finding_line
		case 'heading':
			return props.ref_selector_heading
		case 'local_foreign':
			return props.ref_selector_local_foreign
		case 'order_line':
			return props.ref_selector_order_line
		case 'order':
			return props.ref_selector_order
		case 'order_status':
			return props.ref_selector_order_status
		case 'page_type':
			return props.ref_selector_page_type
		case 'pay_plan':
			return props.ref_selector_pay_plan
		case 'primary_book':
			return props.ref_selector_primary_book
		case 'sales_rep':
			return props.ref_selector_sales_rep
		case 'source_book':
			return props.ref_selector_source_book
		case 'udac':
			return props.ref_selector_udac
		default:
			return undefined
	}
}

const identifyRefListFromRefTableName = (name, props) => {
	switch (name) {
		case 'ad_type':
			return props.ad_type_ref_list
		case 'category':
			return props.category_ref_list
		case 'compensation_plan':
			return props.compensation_plan_ref_list
		case 'customer':
			return props.customer_ref_list
		case 'field':
			return props.field_ref_list
		case 'finding_line':
			return props.finding_line_ref_list
		case 'heading':
			return props.heading_ref_list
		case 'local_foreign':
			return props.local_foreign_ref_list
		case 'order_line':
			return props.order_line_ref_list
		case 'order':
			return props.order_ref_list
		case 'order_status':
			return props.order_status_ref_list
		case 'page_type':
			return props.page_type_ref_list
		case 'pay_plan':
			return props.pay_plan_ref_list
		case 'primary_book':
			return props.primary_book_ref_list
		case 'sales_rep':
			return props.sales_rep_ref_list
		case 'source_book':
			return props.source_book_ref_list
		case 'udac':
			return props.udac_ref_list
		default:
			return undefined
	}
}

const DetailsField = (props) => {
	const { field_definition, current_record, field_name, mode } = props

	const ref_table_name = field_definition.get('ref_table')

	const suffixed_field_name = ref_table_name === undefined ? field_name : field_name + '_id'

	const raw_value = current_record.get(suffixed_field_name)
	const value = raw_value ? raw_value : ref_table_name ? undefined : ''

	const label = field_definition.get('label')
	const input_type = field_definition.get('input_type')
	const readonly = field_definition.get('readonly')
	const display = readonly || mode === 'display'

	const ref_function = identifyRefFunctionFromRefTableName(ref_table_name, props)

	const display_value = ref_function && value ? ref_function(value).get('display') : value

	const ref_list = identifyRefListFromRefTableName(ref_table_name, props)

	const options = field_definition.get('options')

	const relevant_component = () => {
		switch (input_type) {
			case 'text':
				return <TextInput label={label} display={display} value={value} {...props} />

			case 'select':
				return display ? (
					<TextInput label={label} display={display} value={display_value} {...props} />
				) : (
					<SelectInput label={label} display={display} value={value} ref_list={ref_list} {...props} />
				)

			case 'date':
				return <DateInput label={label} display={display} value={value} {...props} />

			case 'radio':
				return <RadioInput label={label} display={display} value={value} options={options} {...props} />

			case 'checkbox':
				return <CheckboxInput label={label} display={display} value={value} {...props} />

			default:
				return null
		}
	}

	return <FieldWrapper>{relevant_component()}</FieldWrapper>
}

export default DetailsField
