import React from 'react'
import createEventDispatcher from './create_dispatcher'

const convertLineData = (data, ref_hash) => {
    const line_data = data.get('list').toJS()
    const ref_functions = ref_hash
    return line_data.map(line => {
        Object.keys(line).forEach(key => {
            if (ref_functions[key] !== undefined) {
                line[key] = line[key] ? ref_functions[key](line[key]) : undefined
            }
        })
        return line
    })
}

const createDataRows = p => {

    const { dispatch, act, data, ref_hash } = p
    const dispatch_obj = { dispatch, act, data }


    const selected_id = data.get('selected_id')
    const select_handler = createEventDispatcher('select', '', dispatch_obj)
    const list_template = data.get('list_template').toJS()
    const converted_line_data = convertLineData(data, ref_hash)

    return converted_line_data.map(line => {
        const line_style = (selected_id === line.id) ? {
            backgroundColor: 'rgb(201, 71, 225)',
            color: 'white'
        } : {}
        const tds = list_template.map(col => {
            const td_style = {
                width: col.width,
                fontSize: '.7rem',
                paddingLeft: '.9rem'
            }
            return (
                <td key={'body-' + col.field_name + line.id}
                    style={td_style}
                >
                    {line[col.field_name]}
                </td>
            )
        })
        return <tr key={line.id} onClick={select_handler.bind(null, line.id)} style={line_style} >{tds}</tr>
    })
}

export default createDataRows
