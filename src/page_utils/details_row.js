import React from 'react'
import styled from 'styled-components'
import DetailField from './details_field'

const RowWrapper = styled.div`
    display: flex;
    font-size: 0.7rem;
    width: 100%;
    flex-wrap: nowrap;
`

const DetailsRow = (props) => {
    const {
        field_definitions,
        row_fields,
        current_record,
        action_word,
        mode,
        dispatch,
    } = props
    return (
        <RowWrapper>
            {row_fields.map(field => {
                return <DetailField
                    key={field}
                    field_definition={field_definitions.get(field)}
                    current_record={current_record}
                    action_word={action_word}
                    mode={mode}
                    dispatch={dispatch}
                />
            })}
        </RowWrapper>
    )
}

export default DetailsRow
