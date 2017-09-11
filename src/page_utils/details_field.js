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

	const ref_function = props.ref_matchers[ref_table_name]

	const display_value = ref_function && value ? ref_function(value).get('display') : value

	const ref_list = props.ref_lists[ref_table_name]

	const options = field_definition.get('options')

	const choose_component = () => {
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

	return <FieldWrapper>{choose_component()}</FieldWrapper>
}

export default DetailsField
