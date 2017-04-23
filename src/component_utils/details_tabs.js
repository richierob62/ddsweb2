import React from 'react'
import createEventDispatcher from './create_dispatcher'


const buildTabs = ( current, data, dispatch_obj ) => {

    if (!current) return null
    
    const tabs = data.getIn(['details_template', 'tabs']).toJS()
    const current_tab = data.getIn(['details_template', 'current_tab'])
    const tab_select_handler = createEventDispatcher('select', 'Tab',  dispatch_obj)
    const clickHandler = (tab) => {
        tab_select_handler(tab)
    }
    return tabs.map(tab => {
        const tab_style = {
            border: tab.name === current_tab ? '2px solid rgb(89, 140, 215)' : '1px solid #767676',
            marginBottom: tab.name === current_tab ? '-1px' : '0',
            padding: '4px 20px',
            borderTopLeftRadius: '14px',
            borderTopRightRadius: '14px',
            marginRight: '1.5rem',
            borderBottom: tab.name === current_tab ? '2px solid white' : 'none',
            cursor: 'pointer',
        }
        return <div key={tab.name} style={tab_style} onClick={clickHandler.bind(null, tab.name)}>{tab.name}</div>
    })
}

export default buildTabs
