import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import actions from '../actions'
import {
  getFieldDefinitions,
  getListTemplate,
  getCurrentSort
} from '../selectors'

const mstp = (state, { page }) => ({
  fields_definitions: getFieldDefinitions(state[page]),
  list_template: getListTemplate(state[page]),
  current_sort: getCurrentSort(state[page]),
  page
})

const WrappingRow = styled.tr``

const ColumnHeading = styled.th`
  width: ${({ width }) => width};
  border: none;
  padding-bottom: 0;
`

const ColumnLabel = styled.span`
  font-size: 0.7rem;
  font-weight: normal;
  color: rgb(58, 57, 57);
  margin-bottom: 0px;
  padding-left: 0.1rem;
  text-transform: uppercase;
`
const StyledIcon = styled.i`
  color: #767676;
  padding-left: 5px;
`

const SortDirectionIcon = ({ sort_direction }) => {
  return sort_direction === 'ASC' ? (
    <StyledIcon className="fa fa-sort-asc" aria-hidden="true" />
  ) : (
    <StyledIcon className="fa fa-sort-desc" aria-hidden="true" />
  )
}

const LabelCells = props => {
  const {
    dispatch,
    list_template,
    current_sort,
    fields_definitions,
    page
  } = props

  // labels
  const labels = fields_definitions.map(def => def.get('label'))

  // sort_field
  const sort_field = current_sort.get('field_name')

  // sort_direction
  const sort_direction = current_sort.get('direction')

  // sort_handler
  const sort_handler_action_name = 'change' + page + 'Sort'
  const sort_handler = payload =>
    dispatch(actions[sort_handler_action_name](payload))

  return (
    <WrappingRow>
      {list_template.map(column => {
        return (
          <ColumnHeading
            key={column.get('field_name')}
            width={column.get('width')}
            onClick={sort_handler.bind(null, column.get('field_name'))}
          >
            <ColumnLabel>{labels.get(column.get('field_name'))}</ColumnLabel>
            {sort_field === column.get('field_name') && (
              <SortDirectionIcon sort_direction={sort_direction} />
            )}
          </ColumnHeading>
        )
      })}
    </WrappingRow>
  )
}

export default connect(mstp)(LabelCells)
