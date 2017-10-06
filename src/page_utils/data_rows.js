import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import actions from '../actions'
import {
  getSelectedID,
  getFieldDefinitions,
  getListTemplateFields,
  getFilteredList,
  refMatcher
} from '../selectors'
import table_names from '../reducers/table_list'
import proper_camel from '../utils/proper_camel'

const mstp = (state, { page }) => {
  const ref_matchers = table_names.reduce((acc, name) => {
    acc[name] = refMatcher(state[name])
    return acc
  }, {})
  return {
    list: getFilteredList(state[page]),
    field_definitions: getFieldDefinitions(state[page]),
    list_template: getListTemplateFields(state[page]),
    page,
    selected_id: getSelectedID(state[page]),
    ref_matchers
  }
}

const WrappingTBody = styled.tbody`border-bottom: 1px solid #8e44ad;`

const DataLine = styled.tr`
  background-color: ${({ selected }) =>
    selected ? 'rgba(44, 62, 80, 0.65)' : 'white'};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  height: 30px;

  &:hover {
    color: ${({ selected }) => (selected ? 'white' : '#2f2f2f')};
    background-color: ${({ selected }) =>
      selected ? 'rgba(44, 62, 80, 0.65)' : 'rgba(189, 195, 199, 0.35)'};
  }
`

const DataCell = styled.td`
  width: ${({ width }) => width};
  font-size: 0.7rem;
  padding-left: 0.9rem;
`

const DataRows = props => {
  const {
    dispatch,
    list,
    field_definitions,
    list_template,
    selected_id,
    page
  } = props

  // select_handler
  const select_handler_action_name = 'select' + proper_camel(page)
  const select_handler = payload =>
    dispatch(actions[select_handler_action_name](payload))

  const fixReferenceFields = (line, column) => {
    const ref_table = field_definitions.getIn([
      column.get('field_name'),
      'ref_table'
    ])

    if (ref_table === undefined) return line.get(column.get('field_name'))

    const ends_with = (name, suffix) =>
      name.indexOf(suffix) === name.length - suffix.length

    const ref_field_name = table => {
      if (ends_with(table, 'ses'))
        return table.substr(0, table.length - 2) + '_id'
      if (ends_with(table, 'ies'))
        return table.substr(0, table.length - 3) + 'y_id'
      return table.substr(0, table.length - 1) + '_id'
    }

    const disp_obj = props.ref_matchers[ref_table](
      line.get(ref_field_name(ref_table))
    )
    const loading = 'loading...'
    return disp_obj ? disp_obj.get('display') : loading
  }

  return (
    <WrappingTBody>
      {list.map(line => {
        return (
          <DataLine
            key={line.get('id')}
            selected={line.get('id') === selected_id}
            onClick={select_handler.bind(null, line.get('id'))}
          >
            {list_template.map(column => {
              return (
                <DataCell
                  key={line.get('id') + column.get('field_name')}
                  width={column.get('width')}
                >
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
