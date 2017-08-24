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

const DetailsField = props => {
  const { field_definition, current_record, field_name, mode } = props

  const ref_table_name = field_definition.get('ref_table')

  const suffixed_field_name = ref_table_name === undefined
    ? field_name
    : field_name + '_id'

  const raw_value = current_record.get(suffixed_field_name)
  const value = raw_value ? raw_value : ref_table_name ? undefined : "";

  const label = field_definition.get('label')
  const input_type = field_definition.get('input_type')
  const readonly = field_definition.get('readonly')
  const display = readonly || mode === 'display'

  const ref_function = ref_table_name === undefined
    ? undefined
    : ref_table_name === 'sales_rep'
        ? props.ref_selector_sales_rep
        : ref_table_name === 'local_foreign'
            ? props.ref_selector_local_foreign
            : ref_table_name === 'pay_plan'
                ? props.ref_selector_pay_plan
                : ref_table_name === 'primary_book'
                    ? props.ref_selector_primary_book
                    : ref_table_name === 'category'
                        ? props.ref_selector_category
                        : ref_table_name === 'compensation_plan'
                            ? props.ref_selector_compensation_plan
                            : undefined

  const display_value = ref_function && value
    ? ref_function(value).get('display')
    : value

  const ref_list = ref_table_name === undefined
    ? undefined
    : ref_table_name === 'sales_rep'
        ? props.sales_rep_ref_list
        : ref_table_name === 'local_foreign'
            ? props.local_foreign_ref_list
            : ref_table_name === 'pay_plan'
                ? props.pay_plan_ref_list
                : ref_table_name === 'primary_book'
                    ? props.primary_book_ref_list
                    : ref_table_name === 'category'
                        ? props.category_ref_list
                        : ref_table_name === 'compensation_plan'
                            ? props.compensation_plan_ref_list
                            : undefined

  const options = field_definition.get('options')

  const relevant_component = () => {
    switch (input_type) {
      case 'text':
        return (
          <TextInput label={label} display={display} value={value} {...props} />
        )

      case 'select':
        return display
          ? <TextInput
              label={label}
              display={display}
              value={display_value}
              {...props}
            />
          : <SelectInput
              label={label}
              display={display}
              value={value}
              ref_list={ref_list}
              {...props}
            />

      case 'date':
        return (
          <DateInput label={label} display={display} value={value} {...props} />
        )

      case 'radio':
        return (
          <RadioInput
            label={label}
            display={display}
            value={value}
            options={options}
            {...props}
          />
        )

      case 'checkbox':
        return (
          <CheckboxInput
            label={label}
            display={display}
            value={value}
            {...props}
          />
        )

      default:
        return null
    }
  }

  return (
    <FieldWrapper>
      {relevant_component()}
    </FieldWrapper>
  )
}

export default DetailsField
