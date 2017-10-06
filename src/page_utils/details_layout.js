import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  getCurrentRecord,
  getCurrentTabRows,
  getMode,
  getFieldDefinitions,
  refMatcher,
  getRefList
} from '../selectors'
import DetailsRow from './details_row'
import table_names from '../reducers/table_list'

const mstp = (state, { page }) => {
  const ref_matchers = table_names.reduce((acc, name) => {
    acc[name] = refMatcher(state[name])
    return acc
  }, {})

  const ref_lists = table_names.reduce((acc, name) => {
    acc[name] = getRefList(state[name])
    return acc
  }, {})

  return {
    current_tab_rows: getCurrentTabRows(state[page]),
    current_record: getCurrentRecord(state[page]),
    page,
    mode: getMode(state[page]),
    field_definitions: getFieldDefinitions(state[page]),
    ref_matchers,
    ref_lists
  }
}

const DetailsWrapper = styled.div`
`

const DetailsLayout = props => {
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
