import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import actions from '../actions'
import { getListTemplateFields, getCurrentFilters, getMode } from '../selectors'
import proper_camel from '../utils/proper_camel'

const mstp = (state, { page }) => ({
  list_template: getListTemplateFields(state[page]),
  current_filters: getCurrentFilters(state[page]),
  page,
  mode: getMode(state[page])
})

const WrappingRow = styled.tr``

const ColumnHeading = styled.th`
  width: ${({ width }) => width};
  padding-bottom: '0';
  padding-top: 0;
  margin-bottom: 0;
  border: none;
`

const ColumnFilter = styled.input`
  margin-top: 0;
  margin-bottom: 0;
`

const Placeholder = styled.div`
  margin-top: 0;
  height: 1.25rem;
  margin-bottom: 0;
`

const FilterCells = props => {
  const { dispatch, list_template, current_filters, page, mode } = props

  // change_handler
  const change_handler_action_name = 'change' + proper_camel(page) + 'Filter'
  const change_handler = (column, e) =>
    dispatch(
      actions[change_handler_action_name]({
        column,
        value: e.currentTarget.value
      })
    )
  return (
    <WrappingRow>
      {list_template.map(column => {
        const cell_value = current_filters.get(column.get('field_name')) || ''

        return (
          <ColumnHeading
            key={column.get('field_name')}
            width={column.get('width')}
          >
            {mode === 'display' ? (
              <ColumnFilter
                type="text"
                className="form-control"
                value={cell_value}
                onChange={change_handler.bind(null, column.get('field_name'))}
              />
            ) : (
              <Placeholder />
            )}
          </ColumnHeading>
        )
      })}
    </WrappingRow>
  )
}

export default connect(mstp)(FilterCells)
