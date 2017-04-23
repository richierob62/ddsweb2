import React from 'react'
import createEventDispatcher from './create_dispatcher'

const createFilterCells = p => {
    const {dispatch, act, data } = p
    const dispatch_obj = { dispatch, act, data }
    const list_template = data.get('list_template').toJS()
    const filter_handler = createEventDispatcher('change', 'Filter', dispatch_obj)
    const current_filters = data.get('current_filters').toJS()
    return list_template.map(col => {
        const cell_value = current_filters[col.field_name] ? current_filters[col.field_name] : ''
        const th_style = {
            width: col.width,
            paddingBottom: '0px',
            paddingTop: '0px',
            marginBottom: '0px',
            border: 'none'
        }
        const input_style = {
            marginTop: '0px',
            marginBottom: '0px'
        }
        const call_handler = (col, e) => {
            filter_handler({ column: col, value: e.currentTarget.value })
        }
        return (
            <th key={'filter-' + col.field_name} style={th_style} className="">
                <input type='text'
                    style={input_style}
                    className="form-control"
                    value={cell_value}
                    onChange={call_handler.bind(null, col.field_name)}
                />
            </th>
        )
    })
}

export default createFilterCells
