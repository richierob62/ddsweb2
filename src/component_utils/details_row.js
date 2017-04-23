import React from 'react'
import { buildField } from './field_maker'

const buildDetailRow = (p, row) => {
    return row.map(field => {
        const field_style = {
            flex: 1,
            marginTop: '9px',
            marginBottom: '3px',
        }
        return <div style={field_style} key={field}>{buildField(p, field)}</div>
    })
}

export default buildDetailRow
