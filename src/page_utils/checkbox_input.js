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

const CheckboxDisplay = styled.div`
  font-size: 0.75rem;
  color: #2c3e50;
  border: none;
  vertical-align: middle;
  display: inline-block;
  margin-top: 2px;
  margin-bottom: -2px;
`

const CheckboxWrapper = styled.span`
  flex: 1;
  font-size: 0.8rem;
  color: #2c3e50;
  border: none;
  margin-left: 0.75rem;
  margin-right: 2rem;
`

const comp = props => {
  const { value, display, label, page, dispatch, field_name } = props

  // select_handler
  const select_handler_action_name = 'change' + proper_camel(page) + 'Data'
  const select_handler = () => {
    dispatch(
      actions[select_handler_action_name]({
        field: field_name,
        value: parseInt(value, 10) === 1 ? 0 : 1
      })
    )
  }

  return (
    <Wrapper>
      <StyledLabel>{label}:</StyledLabel>
      {display ? (
        <div style={{ fontSize: '.75rem', color: 'rgb(42, 5, 49)' }}>
          {parseInt(value, 10) === 1 ? 'Yes' : 'No'}
        </div>
      ) : (
        <CheckboxWrapper>
          <label className="custom-control custom-checkbox">
            <input
              type="checkbox"
              value={parseInt(value, 10) === 1 ? 'on' : 'off'}
              className="custom-control-input"
              checked={parseInt(value, 10) === 1 ? 'checked' : ''}
              onChange={select_handler}
            />
            <span className="custom-control-indicator" />
            <CheckboxDisplay>
              {parseInt(value, 10) === 1 ? 'Yes' : 'No'}
            </CheckboxDisplay>
          </label>
        </CheckboxWrapper>
      )}
    </Wrapper>
  )
}

export default comp
