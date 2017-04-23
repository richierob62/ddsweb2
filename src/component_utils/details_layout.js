import React from 'react'
import buildDetailRow from './details_row'

const layOutFields = p => {
    const { current, data } = p
    if (!current) return null
    const current_tab = data.getIn(['details_template', 'current_tab'])
    const rows = data.getIn(['details_template', 'tabs']).toJS()
        .filter(tab => tab.name === current_tab)[0].rows
    const row_style = {
        display: 'flex',
        fontSize: '0.7rem',
        width: '100%',
        flexWrap: 'nowrap'
    }
    return rows.map((row, idx) => {
        return (
            <div style={row_style} key={idx}>
                {buildDetailRow( p, row)}
            </div>
        )
    })
}

export default layOutFields
