import React from 'react'

const createEventDispatcher = (fst, last, props) => {
    const { dispatch, act } = props
    const action = fst + props.data.get('action_word') + last
    const func = act[action]
    return (payload) => dispatch(func(payload))
}

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
            ? <h5 style={header_style}>{current.name + ' - Acc# ' + current.account_num}</h5>
            : <h5 style={header_style}>No current selection</h5>
    )
}


const buildDisplayField = (current_value, label) => {
    const label_style = {
        color: 'rgba(26, 26, 26, 0.75)',
        fontWeight: 'lighter',
        fontSize: '.75rem',
        marginRight: '5px',
        marginBottom: '0',
        marginTop: '1px',
        width: '100px',
        textAlign: 'right'
    }
    const input_style = {
        flex: 1,
        border: 'none',
        fontSize: '.75rem',
        color: 'blue'
    }
    const holder_style = {
        display: 'flex'
    }
    return (
        <div style={holder_style}>
            <label style={label_style}>{label}:</label>
            <input style={input_style} type="text" value={current_value} onChange={() => { } } />
        </div>
    )
}

const editableTextInput = (field_name, current_value, change_handler) => {
    const input_style = {
        flex: 1,
        fontSize: '.75rem',
        color: 'blue'
    }
    const clickHandler = (field, e) => {
        change_handler({
            field,
            value: e.currentTarget.value
        })
    }    
    return <input style={input_style} type="text" value={current_value} onChange={clickHandler.bind(null, field_name)} />
}

const select = (current_value, ref_list, change_handler) => <div>select</div>
const typeahead = (current_value, ref_list, change_handler) => <div>typeahead</div>
const dateInput = (current_value, change_handler) => <div>date</div>
const checkbox = (current_value, change_handler) => <div>checkbox</div>
const radio = (current_value, change_handler) => <div>radio</div>

const buildMatchingElement = (field_name, current_value, type, ref_list, change_handler) => {
    switch (type) {
        case 'text': return editableTextInput(field_name, current_value, change_handler)
        case 'select': return select(current_value, ref_list, change_handler)
        case 'typeahead': return typeahead(current_value, ref_list, change_handler)
        case 'date': return dateInput(current_value, change_handler)
        case 'checkbox': return checkbox(current_value, change_handler)
        case 'radio': return radio(current_value, change_handler)
    }
}

const buildEditField = (field_name, current_value, label, type, ref_list, change_handler) => {
    // label
    const label_style = {
        color: 'rgba(26, 26, 26, 0.75)',
        fontWeight: 'lighter',
        fontSize: '.75rem',
        marginRight: '5px',
        marginBottom: '0',
        marginTop: '1px',
        width: '100px',
        textAlign: 'right'
    }
    const holder_style = {
        display: 'flex'
    }
    const element = buildMatchingElement(field_name, current_value, type, ref_list, change_handler)
    return (
        <div style={holder_style}>
            <label style={label_style}>{label}:</label>
            {element}
        </div>
    )
}

const buildField = (field_name, current_value, mode, label, type, ref_list, change_handler) => {
    return mode === 'display' ? buildDisplayField(current_value, label) : buildEditField(field_name, current_value, label, type, ref_list, change_handler)
}

const buildDetailRow = (current, row, mode, labels_and_types, ref_lists, change_handler) => {
    return row.map(field => {
        const field_style = {
            flex: 1
        }
        const label = labels_and_types.find(fld => fld.field_name === field).label
        const type = labels_and_types.find(fld => fld.field_name === field).input_type
        const name_list_needed = labels_and_types.find(fld => fld.field_name === field).ref_table
        const ref_list = ref_lists[name_list_needed]
        return <div style={field_style} key={field}>{buildField(field, current[field], mode, label, type, ref_list, change_handler)}</div>
    })
}

const layOutFields = (current, mode, rows, labels_and_types, ref_lists, change_handler) => {
    if (!current) return null
    const row_style = {
        display: 'flex',
        fontSize: '0.7rem',
        width: '100%',
        flexWrap: 'nowrap'
    }
    return rows.map((row, idx) => {
        return (
            <div style={row_style} key={idx}>
                {buildDetailRow(current, row, mode, labels_and_types, ref_lists, change_handler)}
            </div>
        )
    })
}

const buildTabs = (p, current) => {
    if (!current) return null
    const tabs = p.data.getIn(['details_template', 'tabs']).toJS()
    const current_tab = p.data.getIn(['details_template', 'current_tab'])
    const tab_select_handler = createEventDispatcher('select', 'Tab', p)
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

const convertDetailsData = (current, ref_hash) => {
    Object.keys(current).forEach(key => {
        if (ref_hash[key] !== undefined) {
            current[key] = ref_hash[key](current[key])
        }
    })
    return current
}

const buildPageDetails = p => {
    const current = p.current ? convertDetailsData(p.current.toJS(), p.ref_hash) : null
    const mode = p.data.get('mode')
    const details_title = buildDetailsHeader(current)
    const tabs = buildTabs(p, current)
    const current_tab = p.data.getIn(['details_template', 'current_tab'])
    const rows = p.data.getIn(['details_template', 'tabs']).toJS()
        .filter(tab => tab.name === current_tab)[0].rows
    const labels_and_types = p.data.get('fields').toJS()
    const ref_lists = p.ref_lists
    const change_handler = createEventDispatcher('change', 'Data', p)
    const fields = layOutFields(current, mode, rows, labels_and_types, ref_lists, change_handler)
    const tab_style = {
        display: 'flex',
        color: 'rgb(162, 156, 156)',
        fontWeight: '100',
        fontSize: '.9rem',
        marginBottom: '10px',
        paddingTop: '.5rem',
        borderBottom: current ? '2px solid rgb(89, 140, 215)' : 'none'
    }
    const details_style = {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    }
    const field_section_style = {
        marginTop: '25px'
    }
    return (
        <div style={details_style}>
            <div>{details_title}</div>
            <div style={tab_style}>{tabs}</div>
            <div style={field_section_style}>{fields}</div>
        </div>
    )
}

const buildPageContextMenu = p => {
    const menu_style = {
        width: '10%'
    }
    return <div style={menu_style}>context menu</div>
}

const buildFieldObject = (acc, field) => {
    acc[field.get('field_name')] = field.get('label')
    return acc
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

    const working_object = {
        action_word: props.data.get('action_word')
    }
    const page_title = buildPageTitle(props)
    const page_list = buildPageList(props)
    const page_detail = buildPageDetails(props)
    const page_context_menu = buildPageContextMenu(props)

    return (
        <div className={'page_title'}>
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
