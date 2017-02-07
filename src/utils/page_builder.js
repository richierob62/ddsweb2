import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

const createEventDispatcher = (fst, last, props) => {
    const { dispatch, act } = props
    const action = fst + props.data.get('action_word') + last
    const func = act[action]
    return (payload) => dispatch(func(payload))
}

const createTypeaheadEventDispatcher = (p, field) => {
    const { dispatch, act } = p
    const action = field + 'TypeaheadChange'
    const func = act[action]
    return (payload) => dispatch(func(payload))
}

const hasRadioGroup = (p, field) => (p.data.get('radio_groups').toJS().find(grp => grp.field_name === field)) !== undefined ? true : false

const isCheckBox = (p, field) => (p.data.get('fields').toJS().find(fld => fld.field_name === field).input_type) === 'checkbox' ? true : false

const radioGroupDisplayValue = (p, field) => {
    return p.data.get('radio_groups')
        .toJS()
        .find(grp => grp.field_name === field)
        .options
        .find(opt => opt.id === p.current.get(field))
        .display
}

const checkboxDisplayValue = (p, field) => p.current.toJS()[field] !== 0 ? 'Yes' : 'No'

const editableTextInput = (p, field, value) => {
    const input_style = {
        flex: 1,
        fontSize: '.75rem',
        color: 'blue',
        border: 'none',
        borderBottom: '1px solid #767676',
        paddingLeft: '.75rem',
    }

    const change_handler = createEventDispatcher('change', 'Data', p)

    const changeHandler = (field, e) => {
        change_handler({
            field,
            value: e.currentTarget.value
        })
    }
    return <input style={input_style} type="text" value={value} onChange={changeHandler.bind(null, field)} />
}

const select = (p, field, value) => {

    const ref_list = p.ref_lists[field]

    const select_rows = () => {
        if (!ref_list) return null;
        return ref_list.map(option => {
            return <option className="select-option" key={option.id} value={option.id}>{option.display}</option>
        })
    }

    const select_style = {
        flex: 1,
        fontSize: '.75rem',
        color: 'blue',
        height: 'calc(2rem - 2px)',
        borderBottom: '1px solid #767676',
        marginTop: '-5px',
    }

    const change_handler = createEventDispatcher('change', 'Data', p)

    const clickHandler = (field, e) => {
        change_handler({
            field,
            value: parseInt(e.currentTarget.value, 10)
        })
    }

    const selected_id = ref_list ?
        ref_list.find(option => option.display === value) ?
            ref_list.find(option => option.display === value).id :
            undefined :
        undefined

    return (
        <select value={selected_id} style={select_style} className="custom-select" onChange={clickHandler.bind(null, field)}>
            {select_rows()}
        </select>
    )
}

const typeahead = (p, field, value) => {

    const current_value = value || p.typeaheads[field]

    const typeahead_style = {
        flex: 1,
        display: 'flex',
        fontSize: '0.75rem',
        color: 'blue',
        height: 'calc(2rem - 2px)',
        marginTop: '-5px',
        position: 'relative',
    }

    const input_style = {
        flex: 1,
        color: 'blue',
        padding: '.375rem 1.75rem .375rem .75rem',
        verticalAlign: 'middle',
        border: '1px solid rgba(0,0,0,.15)',
        borderBottom: '1px solid rgb(118, 118, 118)',
        borderRadius: '.25rem',
    }

    const options_box_style = {
        position: 'absolute',
        background: 'white',
        top: '2rem',
        width: '100%',
        border: '1px solid rgba(0,0,0,.15)',
        borderRadius: '.25rem',
    }

    const option_style = {
        cursor: 'pointer',
        paddingLeft: '.75rem',
    }

    const change_handler = createEventDispatcher('change', 'Data', p)

    const typeahead_handler = createTypeaheadEventDispatcher(p, field)

    const name_list_needed = p.data.get('fields')
        .toJS()
        .find(fld => fld.field_name === field).ref_table

    const value_is_exact_match = (val) => {
        const count = p.ref_lists[name_list_needed]
            .filter(item => item.display.toUpperCase().indexOf(val.toUpperCase()) >= 0)
            .length
        return count === 1
    }

    const changeHandler = (field, e) => {

        const new_val = e.currentTarget.value

        if (value_is_exact_match(new_val)) {
            // changed to an exact match
            const new_id = p.ref_lists[name_list_needed]
                .find(item => item.display.toUpperCase().indexOf(new_val.toUpperCase()) >= 0)
                .id
            typeahead_handler('')
            change_handler({
                field,
                value: new_id
            })


        } else {
            // not changed to an exact match
            typeahead_handler(new_val)
            change_handler({
                field,
                value: undefined
            })

        }
    }

    const optionSelectHandler = (id) => {
        typeahead_handler('')
        change_handler({
            field,
            value: id
        })
    }

    const renderOptionsBox = () => {
        const option_items = p.ref_lists[name_list_needed]
            .map(option => {
                return (
                    <div
                        style={option_style}
                        key={option.id}
                        onClick={optionSelectHandler.bind(null, option.id)}
                        className='option-item'
                    >
                        {option.display}
                    </div>
                )
            })
        return <div style={options_box_style}>{option_items}</div>
    }

    return (
        <div style={typeahead_style}>
            <input type="text" style={input_style} value={current_value} onChange={changeHandler.bind(null, field)} />
            {!value_is_exact_match(current_value) && renderOptionsBox()}
        </div>
    )
}

const radio = (p, field) => {

    const radio_group_style = {

    }

    const change_handler = createEventDispatcher('change', 'Data', p)

    const optionSelectHandler = (id) => {
        change_handler({
            field,
            value: id
        })
    }

    const isSelected = value => p.current.get(field) === value ? true : false

    const renderOptions = () => {
        return p.data.get('radio_groups')
            .toJS()
            .find(grp => grp.field_name === field)
            .options.map(option => {
                return (
                    <label className="custom-control custom-radio" key={option.id} >
                        <input name={'radio_' + field} type="radio"
                            className="custom-control-input"
                            checked={isSelected(option.id)}
                            onChange={optionSelectHandler.bind(null, option.id)}
                        />
                        <span className="custom-control-indicator"></span>
                        <span className="custom-control-description">{option.display}</span>
                    </label>
                )
            })
    }

    return (
        <div style={radio_group_style}>
            {renderOptions()}
        </div>
    )
}

const dateInput = (p, field, value) => {
    const change_handler = createEventDispatcher('change', 'Data', p)
    const handleChange = date => {
        change_handler({
            field,
            value: date.format('YYYY-MM-DD')
        })
    }
    return (
        <DatePicker
            selected={moment(value)}
            onChange={handleChange} />
    )
}

const checkbox = (p, field, value) => {
    const change_handler = createEventDispatcher('change', 'Data', p)
    const handleChange = (field, e) => {
        change_handler({
            field,
            value: e.currentTarget.value === 'on' ? 0 : 1
        })
    }
    return (
        <label className="custom-control custom-checkbox" style={{ marginLeft: '.375rem'}}>
            <input
                type="checkbox"
                value={value === 'Yes' ? 'on' : 'off'}
                className="custom-control-input"
                checked={value === 'Yes' ? 'checked' : ''}
                onChange={handleChange.bind(null, field)} />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">{value}</span>
        </label>
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
        borderColor: 'transparent',
        fontSize: '.75rem',
        color: 'blue'
    }
    const holder_style = {
        display: 'flex'
    }
    return (
        <div style={holder_style}>
            <label style={label_style}>{label}:</label>
            <input style={input_style} type="text" value={current_value} onChange={() => { }} />
        </div>
    )
}

const buildMatchingElement = (p, field, value) => {
    const type = p.data.get('fields')
        .toJS()
        .find(fld => fld.field_name === field).input_type
    switch (type) {
        case 'text': return editableTextInput(p, field, value)
        case 'select': return select(p, field, value)
        case 'typeahead': return typeahead(p, field, value)
        case 'date': return dateInput(p, field, value)
        case 'checkbox': return checkbox(p, field, value)
        case 'radio': return radio(p, field)
        default: return <div>{value}</div>
    }
}

const buildEditField = (p, field, value, label) => {
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
    return (
        <div style={holder_style}>
            <label style={label_style}>{label}:</label>
            {buildMatchingElement(p, field, value)}
        </div>
    )
}

const buildField = (p, field) => {
    const mode = p.data.get('mode')
    const label = p.data.get('fields')
        .toJS()
        .find(fld => fld.field_name === field).label

    const value = p.ref_hash[field] && p.current.get(field) ? p.ref_hash[field](p.current.get(field))
        : (hasRadioGroup(p, field) ? radioGroupDisplayValue(p, field)
            : (isCheckBox(p, field)) ? checkboxDisplayValue(p, field)
                : p.current.get(field))

    return mode === 'display'
        ? buildDisplayField(value, label)
        : buildEditField(p, field, value, label)
}

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

const buildDetailsHeader = p => {
    const header_style = {
        color: 'rgba(26, 26, 26, 0.74)',
        fontWeight: 'lighter',
        fontSize: '1rem',
        marginBottom: '10px',
        marginTop: '10px'
    }
    return (
        p.current
            ? <h5 style={header_style}>`{p.current.get('name')} - Acc# {p.current.get('account_num')}`</h5>
            : <h5 style={header_style}>No current selection</h5>
    )
}

const buildTabs = (p) => {
    if (!p.current) return null
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

const layOutFields = (p) => {
    if (!p.current) return null
    const current_tab = p.data.getIn(['details_template', 'current_tab'])
    const rows = p.data.getIn(['details_template', 'tabs']).toJS()
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
                {buildDetailRow(p, row)}
            </div>
        )
    })
}

const buildFieldObject = (acc, field) => {
    acc[field.get('field_name')] = field.get('label')
    return acc
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

const convertLineData = p => {
    const line_data = p.data.get('list').toJS()
    const ref_functions = p.ref_hash
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
    const selected_id = p.data.get('selected_id')
    const select_handler = createEventDispatcher('select', '', p)
    const list_template = p.data.get('list_template').toJS()
    const converted_line_data = convertLineData(p)

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

const buildPageDetails = p => {
    const tab_style = {
        display: 'flex',
        color: 'rgb(162, 156, 156)',
        fontWeight: '100',
        fontSize: '.9rem',
        marginBottom: '10px',
        paddingTop: '.5rem',
        borderBottom: p.current ? '2px solid rgb(89, 140, 215)' : 'none'
    }
    const details_style = {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    }
    const field_section_style = {

    }
    return (
        <div style={details_style}>
            <div>{buildDetailsHeader(p)}</div>
            <div style={tab_style}>{p.current ? buildTabs(p) : ''}</div>
            <div style={field_section_style}>{layOutFields(p)}</div>
        </div>
    )
}

const buildPageContextMenu = p => {
    const menu_style = {
        width: '10%'
    }
    return <div style={menu_style}>context menu</div>
}

const buildPageList = p => {
    return (
        <div>
            <table className={'table table-sm table-striped table-hover'} style={{ border: 'none' }} >
                <thead style={{ paddingBottom: '.5rem' }}>
                    <tr>{createLabelCells(p)}</tr>
                    <tr>{createFilterCells(p)}</tr>
                </thead>
                <tbody>{createDataRows(p)}</tbody>
            </table>
        </div>
    )
}

const buildPageTitle = p => {
    const title = p.data.get('page_title')
    return <h1 className="page-title">{title}</h1>
}

export const buildPage = props => {
    return (
        <div className={'page_title'}>
            {buildPageTitle(props)}
            <div className="page-vertical">
                {buildPageList(props)}
                <div className="page-lower">
                    {buildPageDetails(props)}
                    {buildPageContextMenu(props)}
                </div>
            </div>
        </div>
    )
}