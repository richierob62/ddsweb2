/* @flow */

import React from 'react'
import { pipe } from './fp'

const buildPageDetails = p => <div>details</div>
const buildPageContextMenu = p => <div>context menu</div>

const buildFieldObject = (acc, field) => {
    acc[field.get('field_name')] = field.get('label')
    return acc
}

const createEventDispatcher = (fst, last, props) => {
    const { dispatch, act } = props
    const action = fst + props.data.get('action_word') + last
    const func = act[action]
    return (payload) => dispatch(func(payload))
}

const createFilterCells = p => {
    const list_template = p.data.get('list_template').toJS()
    const filter_handler = createEventDispatcher('change', 'Filter', p)
    const current_filters = p.data.get('current_filters').toJS()
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
        return (
            <th key={'filter-' + col.field_name} style={th_style} className="">
                <input type='text'
                    style={input_style}
                    className="form-control"
                    value={cell_value}
                    onChange={filter_handler.bind(null, col.field_name)}
                    />
            </th>
        )
    })
}

const buildFilterRow = p => {
    const cells = createFilterCells(p)
    return <tr>{cells}</tr>
}

const createLabelCells = p => {
    const labels = p.data.get('fields')
        .reduce(buildFieldObject, {})
    const list_template = p.data.get('list_template').toJS()
    const current_sort = p.data.get('current_sort').toJS()
    const sort_handler = createEventDispatcher('change', 'Sort', p)
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

const buildLabelRow = p => {
    const cells = createLabelCells(p)
    return <tr>{cells}</tr>
}

const buildListHeader = p => {
    const filter_row = buildFilterRow(p)
    const label_row = buildLabelRow(p)
    return (
        <thead style={{ paddingBottom: '.5rem' }}>
            {label_row}
            {filter_row}
        </thead>
    )
}

const convertLineData = p => {
    const line_data = p.data.get('list').toJS()
    const ref_functions = p.ref_hash
    return line_data.map(line => {
        Object.keys(line).forEach(key => {
            if (ref_functions[key] !== undefined) {
                line[key] = ref_functions[key](line[key])
            }
        })
        return line
    })
}

const createDataRows = p => {
    const selected_id = p.data.get('selected_id')
    const select_handler = createEventDispatcher('select', '', p)
    const list_template = p.data.get('list_template').toJS()
    const converted_line_data = convertLineData(p)

    return converted_line_data.map(line => {
        const line_style = (selected_id === line.id) ? { backgroundColor: 'rgba(4, 66, 155, 0.28)' } : {}
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

const buildListBody = p => {
    const rows = createDataRows(p)
    return <tbody>{rows}</tbody>
}

const buildPageList = p => {
    const list_header = buildListHeader(p)
    const list_body = buildListBody(p)
    return (
        <div>
            <table className={'table table-sm table-striped table-hover'} style={{ border: 'none' }} >
                {list_header}
                {list_body}
            </table>
        </div>
    )
}

const buildPageTitle = p => {
    const title = p.data.get('page_title')
    return <h1 className="page-title">{title}</h1>
}

export const buildPage = props => {

    const page_title = buildPageTitle(props)
    const page_list = buildPageList(props)
    const page_detail = buildPageDetails(props)
    const page_context_menu = buildPageContextMenu(props)

    return (
        <div className={page_title}>
            {page_title}
            <div className="page-vertical">
                {page_list}
                <div className="page-lower">
                    {page_detail}
                    {page_context_menu}
                </div>
            </div>
        </div>
    )
}
