import React from 'react'
import styled from 'styled-components'
import actions from '../actions'

const Tab = styled.div`
    cursor: pointer;
    padding: 4px 20px;
    margin-right: 1.5rem;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    border-bottom: ${ props => props.is_current
        ? '4px solid #2C3E50'
        : 'none'};
    color: ${  props => props.is_current
        ? '#2C3E50'
        : 'inherit'};
    margin-bottom: ${  props => props.is_current
        ? '-5px'
        : 'inherit'};        
    padding-top: ${  props => props.is_current
        ? '17px'
        : 'inherit'};        
    padding-bottom: 0px;
    transition: all 200ms ease-in;
`

const tab = (props) => {

    const { dispatch } = props

    // sort_handler
    const select_handler_action_name = 'select' + props.action_word + 'Tab'
    const select_handler = (payload) => dispatch(actions[select_handler_action_name](payload))

    return (
        <Tab
            {...props}
            onClick={select_handler.bind(null, props.name)}
        >
            {props.name}
        </Tab>
    )
}

export default tab
