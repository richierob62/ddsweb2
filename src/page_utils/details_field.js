import React from 'react'
import styled from 'styled-components'

import TextInput from './text_input'
import SelectInput from './select_input'
import TypeaheadInput from './typeahead_input'
import DateInput from './date_input'
import RadioInput from './radio_input'
import CheckboxInput from './checkbox_input'

const FieldWrapper = styled.div`
    flex: 1;
    margin-top: 9px;
    margin-bottom: 3px;
`

const DetailsField = (props) => {
    const {
        field_definition,
        current_record,
        action_word,
        mode,
        dispatch,
    } = props

    const label = field_definition.get('label')
    const input_type = field_definition.get('input_type')
    const ref_table = field_definition.get('ref_table')
    const readonly = field_definition.get('readonly')
    const display = readonly || mode === 'display'

    const relevant_component = () => {
        switch (input_type) {
            case 'text':
                return (
                    <TextInput
                        label={label}
                        record={current_record}
                        action_word={action_word}
                        dispatch={dispatch}
                        display={display}
                    />
                )
            case 'select':
                return (
                    <SelectInput
                        label={label}
                        record={current_record}
                        action_word={action_word}
                        dispatch={dispatch}
                        ref_table={ref_table}
                        display={display}
                    />
                )
            case 'typeahead':
                return (
                    <TypeaheadInput
                        label={label}
                        record={current_record}
                        action_word={action_word}
                        dispatch={dispatch}
                        ref_table={ref_table}
                        display={display}
                    />
                )
            case 'date':
                return (
                    <DateInput
                        label={label}
                        record={current_record}
                        action_word={action_word}
                        dispatch={dispatch}
                        display={display}
                    />
                )
            case 'radio':
                return (
                    <RadioInput
                        label={label}
                        record={current_record}
                        action_word={action_word}
                        dispatch={dispatch}
                        display={display}
                    />
                )
            case 'checkbox':
                return (
                    <CheckboxInput
                        label={label}
                        record={current_record}
                        action_word={action_word}
                        dispatch={dispatch}
                        display={display}
                    />
                )

        }
    }

    return (
        <FieldWrapper>
            {relevant_component()}
        </FieldWrapper>
    )
}

export default DetailsField
