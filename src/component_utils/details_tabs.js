import React from 'react'
import createEventDispatcher from './create_dispatcher'
import styled from 'styled-components'

const Tab = styled.div`
    cursor: pointer;
    padding: 4px 20px;
    margin-right: 1.5rem;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    border-bottom: ${ props => props.name === props.current_tab_name
        ? '8px solid rgb(201, 71, 225)'
        : 'none'};
    color: ${ props => props.name === props.current_tab_name
        ? 'rgb(201, 71, 225)'
        : 'inherit'};
    margin-bottom: ${ props => props.name === props.current_tab_name
        ? '-5px'
        : 'inherit'};        
    padding-top: ${ props => props.name === props.current_tab_name
        ? '17px'
        : 'inherit'};        
    padding-bottom: 0px;
    transition: all 200ms ease-in;
`

const buildTabs = (current, data, dispatch_obj) => {

    if (!current) return null

    const tabs = data.getIn(['details_template', 'tabs']).toJS()
    const current_tab_name = data.getIn(['details_template', 'current_tab'])
    const tab_select_handler = createEventDispatcher('select', 'Tab', dispatch_obj)
    const clickHandler = (tab) => {
        tab_select_handler(tab)
    }
    return tabs.map(tab => (
        <Tab
            key={tab.name}
            name={tab.name}
            onClick={clickHandler.bind(null, tab.name)}
            current_tab_name={current_tab_name}
        >
            {tab.name}
        </Tab>
    ))
}

export default buildTabs
