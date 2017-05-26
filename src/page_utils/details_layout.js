import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getCurrentRecord, getActionWord, getCurrentTabRows, getMode, getFieldDefinitions } from '../selectors'
import DetailsRow from './details_row'

const mstp = (state, ownProps) => ({
    current_tab_rows: getCurrentTabRows(state[ownProps.page]),
    current_record: getCurrentRecord(state[ownProps.page]),
    action_word: getActionWord(state[ownProps.page]),
    mode: getMode(state[ownProps.page]),
    field_definitions: getFieldDefinitions(state[ownProps.page])
})

const DetailsWrapper = styled.div`

`

const DetailsLayout = (props) => {

    const {
        current_tab_rows,
        current_record,
        field_definitions,
        action_word,
        mode,
        dispatch,
    } = props

    return (
        current_record === null ?
            null :
            <DetailsWrapper>
                {
                    current_tab_rows.map((row, idx) => {
                        return (
                            <DetailsRow key={idx}
                                current_record={current_record}
                                action_word={action_word}
                                dispatch={dispatch}
                                mode={mode}
                                row_fields={row}
                                field_definitions={field_definitions}
                            />
                        )
                    })
                }
            </DetailsWrapper>
    )
}

export default connect(mstp)(DetailsLayout)

