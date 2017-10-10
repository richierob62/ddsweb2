import React from 'react'
import styled from 'styled-components'
import actions from '../actions'
import proper_camel from '../utils/proper_camel'

const Tab = styled.div`
  cursor: pointer;
  padding: 4px 20px;
  margin-right: 1.5rem;
  border-bottom: ${props => (props.is_current ? '3px solid #2C3E50' : 'none')};
  color: ${props => (props.is_current ? '#2C3E50' : 'inherit')};
  margin-bottom: ${props => (props.is_current ? '0' : 'inherit')};
  padding-top: ${props => (props.is_current ? '17px' : 'inherit')};
  padding-bottom: 0px;
  transition: all 250ms ease-in;
  font-size: .8rem;
`

const tab = props => {

  const { dispatch, page } = props

  // sort_handler
  const select_handler_action_name = 'select' + proper_camel(page) + 'Tab'
  const select_handler = payload =>
    dispatch(actions[select_handler_action_name](payload))

  return (
    <Tab {...props} onClick={select_handler.bind(null, props.name)}>
      {props.name}
    </Tab>
  )
}

export default tab
