import React from 'react'
import createEventDispatcher from './create_dispatcher'


const buildFieldObject = (acc, field) => {
    acc[field.get('field_name')] = field.get('label')
    return acc
}


const createLabelCells = p => {

    const {dispatch, act, data } = p
    const dispatch_obj = { dispatch, act, data }

    const labels = data.get('fields')
        .reduce(buildFieldObject, {})
    const list_template = data.get('list_template').toJS()
    const current_sort = data.get('current_sort').toJS()
    const sort_handler = createEventDispatcher('change', 'Sort', dispatch_obj)
    return list_template.map(col => {
        const th_style = {
            width: col.width,
            border: 'none',
            paddingBottom: '0'
        }
        const label_style = {
            fontSize: '.7rem',
            fontWeight: 'normal',
            color: 'rgb(58, 57, 57)',
            marginBottom: '0px',
            paddingLeft: '.1rem'
        }
        const sort_style = {
            color: '#767676',
            paddingLeft: '5px'
        }
        const sort_field = current_sort.field_name
        const sort_direction = current_sort.direction
        const sort_indicator = (sort_field === undefined) ? ''
            : (sort_field !== col.field_name) ? ''
                : (sort_direction === 'ASC') ? <i className="fa fa-sort-asc" aria-hidden="true"></i>
                    : <i className="fa fa-sort-desc" aria-hidden="true"></i>
        return (
            <th key={'label-' + col.field_name}
                style={th_style}
                onClick={sort_handler.bind(null, col.field_name)}
            >
                <span style={label_style} className="text-uppercase">{labels[col.field_name]}</span>
                <span style={sort_style}>{sort_indicator}</span>
            </th>
        )
    })
}

export default createLabelCells
