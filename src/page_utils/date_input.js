import React from 'react'
import styled from 'styled-components'
import actions from '../actions'
import DatePicker from 'react-datepicker'
import moment from 'moment'
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
const StyledDatePicker = styled(DatePicker)`
  flex: 1;
  font-size: 0.75rem;
  color: #2c3e50;
  border: none;
  border-bottom: 1px solid #767676;
  margin-left: 0.75rem;
  margin-right: 2rem;
`

const comp = props => {
  const { value, label, page, display, dispatch, field_name } = props
  const moment_val = moment(!value ? new Date() : value)

  const display_value = moment_val.format('MM/DD/YY')

  // select_handler
  const select_handler_action_name = 'change' + proper_camel(page) + 'Data'
  const select_handler = val => {
    dispatch(
      actions[select_handler_action_name]({ field: field_name, value: val })
    )
  }

  return (
    <Wrapper>
      <StyledLabel>{label}:</StyledLabel>
      {display ? (
        <div style={{ fontSize: '.75rem', color: 'rgb(42, 5, 49)' }}>
          {display_value}
        </div>
      ) : (
        <StyledDatePicker
          selected={moment_val}
          onChange={select_handler}
          fixedHeight={true}
          showYearDropdown={true}
        />
      )}
    </Wrapper>
  )
}

export default comp
