import React from 'react'

const buildDetailsHeader = current => {
    const header_style = {
        color: 'rgba(26, 26, 26, 0.74)',
        fontWeight: 'lighter',
        fontSize: '1rem',
        marginBottom: '10px',
        marginTop: '10px'
    }
    return (
        current
            ? <h5 style={header_style}>`{current.get('name')} - Acc# {current.get('account_num')}`</h5>
            : <h5 style={header_style}>No current selection</h5>
    )
}

export default buildDetailsHeader
