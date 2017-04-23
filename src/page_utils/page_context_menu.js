import React from 'react'
import createLink from '../component_utils/context_menu_link'
import contextMenuButtons from '../component_utils/context_menu_buttons'

const buildPageContextMenu = p => {
    if (!p.current) return null
    const menu_style = {
        width: '15%',
        marginTop: '50px',
        paddingLeft: '20px',
        color: 'rgb(162, 156, 156)',
        fontWeight: '100',
        fontSize: '0.9rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
    const para_style = {
        marginBottom: '0',
        paddingBottom: '0',
    }
    const links = p.data.get('context_menu').toJS()
        .map(link => createLink(p, link))
    return (
        <div style={menu_style}>
            <p style={para_style} >Related Items</p>
            {links}
            {contextMenuButtons(p)}
        </div>
    )
}

export default buildPageContextMenu
