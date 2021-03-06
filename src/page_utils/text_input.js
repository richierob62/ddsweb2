import React from 'react'
import styled from 'styled-components'
import actions from '../actions'
import proper_camel from '../utils/proper_camel'

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
const DisplayOnlyInput = styled.input`
  flex: 1;
  border: none;
  font-size: 0.8rem;
  color: rgb(42, 5, 49);
`

const EditableInput = styled.input`
  flex: 1;
  font-size: 0.8rem;
  color: #2c3e50;
  border: none;
  border-bottom: 1px solid #767676;
  margin-left: 0.75rem;
  margin-right: 2rem;
`

const comp = props => {
  const { label, field_name, value, page, dispatch, display } = props

  // change_handler
  const change_handler_action_name = 'change' + proper_camel(page) + 'Data'
  const change_handler = (fld, e) =>
    dispatch(
      actions[change_handler_action_name]({
        field: field_name,
        value: e.currentTarget.value
      })
    )

  return (
    <Wrapper>
      <StyledLabel>{label}:</StyledLabel>
      {display === true ? (
        <DisplayOnlyInput type="text" value={value} onChange={() => {}} />
      ) : (
        <EditableInput
          type="text"
          value={value}
          onChange={change_handler.bind(null, field_name)}
        />
      )}
    </Wrapper>
  )
}
export default comp
