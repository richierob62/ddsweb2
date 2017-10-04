import React from 'react'
import styled from 'styled-components'
import actions from '../actions'
import DropdownList from 'react-widgets/lib/DropdownList'

const Wrapper = styled.div`display: flex;`

const StyledLabel = styled.label`
  color: rgba(26, 26, 26, 0.75);
  font-weight: lighter;
  font-size: 0.75rem;
  margin-right: 5px;
  margin-bottom: 0;
  margin-top: 1px;
  min-width: 100px;
  text-align: right;
`

const filter_func = (item, value) =>
  item.display.toUpperCase().indexOf(value.toUpperCase()) >= 0

const comp = props => {
  const {
    ref_list,
    value,
    label,
    action_word,
    display,
    dispatch,
    field_name
  } = props

  const data = ref_list.toJS()

  // select_handler
  const select_handler_action_name = 'change' + action_word + 'Data'
  const select_handler = selected => {
    dispatch(
      actions[select_handler_action_name]({
        field: field_name + '_id',
        value: selected.id
      })
    )
  }

  return (
    <Wrapper>
      <StyledLabel>{label}:</StyledLabel>
      <DropdownList
        style={{
          marginLeft: '.75rem',
          marginRight: '2rem'
        }}
        data={data}
        valueField="id"
        textField="display"
        defaultValue={value}
        filter={filter_func}
        readOnly={display}
        onSelect={select_handler}
      />
    </Wrapper>
  )
}

export default comp
