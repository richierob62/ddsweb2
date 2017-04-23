import React from 'react'
import createEventDispatcher from './create_dispatcher'

const createTypeaheadEventDispatcher = (p, field) => {
    const { dispatch, act } = p
    const action = field + 'TypeaheadChange'
    const func = act[action]
    return (payload) => dispatch(func(payload))
}

const editable_text_input = (p, field, value) => {
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

    let input;

    const handleKeyUpInput = (e) => {
        if (e.keyCode === 40 && input && input.children) {
            e.stopPropagation()
            input.children[0].focus()
        }
    }

    const handleKeyUpOption = (id, e) => {

        if (e.keyCode === 40 && input && input.children) {
            const arr = [...input.children]
            for (let i = 0; i < arr.length; i++) {
                if (input.children[i].innerHTML === e.currentTarget.innerHTML) {
                    if (i + 1 < arr.length) {
                        input.children[i + 1].focus()
                        break;
                    }
                }
            }
        }

        if (e.keyCode === 38 && input && input.children) {
            const arr = [...input.children]
            for (let i = 0; i < arr.length; i++) {
                if (input.children[i].innerHTML === e.currentTarget.innerHTML) {
                    if (i - 1 >= 0) {
                        input.children[i - 1].focus()
                        break;
                    }
                }
            }
        }

        if (e.keyCode === 13 && input && input.children) {
            optionSelectHandler(id)
        }

    }

    const renderOptionsBox = () => {
        const option_items = p.ref_lists[name_list_needed]
            .map(option => {
                return (
                    <div
                        style={option_style}
                        key={option.id}
                        tabIndex="-1"
                        onClick={optionSelectHandler.bind(null, option.id)}
                        onKeyUp={handleKeyUpOption.bind(null, option.id)}
                        className='option-item'
                    >
                        {option.display}
                    </div>
                )
            })
        return (
            <div
                style={options_box_style}
                ref={input !== undefined ? () => { } : e => input = e}
            >
                {option_items}
            </div>
        )
    }

    return (
        <div style={typeahead_style}>
            <input type="text"
                style={input_style}
                value={current_value}
                onChange={changeHandler.bind(null, field)}
                onKeyUp={handleKeyUpInput} />
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
    const date_style = {
        fontSize: '.75rem',
        color: 'blue',
        border: 'none',
        borderBottom: '1px solid #767676',
        paddingLeft: '.75rem',
    }
    const handleChange = e => {
        change_handler({
            field,
            value: e.currentTarget.value
        })
    }
    return (
        <input style={date_style} type="date" value={value ? value : new Date()} onChange={handleChange} />
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
        <label className="custom-control custom-checkbox" style={{ marginLeft: '.375rem' }}>
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

const radioGroupDisplayValue = (p, field) => {
    return p.data.get('radio_groups')
        .toJS()
        .find(grp => grp.field_name === field)
        .options
        .find(opt => opt.id === p.current.get(field))
        .display
}

const buildMatchingElement = (p, field, value) => {
    const type = p.data.get('fields')
        .toJS()
        .find(fld => fld.field_name === field).input_type
    switch (type) {
        case 'text': return editable_text_input(p, field, value)
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

const checkboxDisplayValue = (p, field) => p.current.toJS()[field] !== 0 ? 'Yes' : 'No'

const hasRadioGroup = (p, field) => (p.data.get('radio_groups').toJS().find(grp => grp.field_name === field)) !== undefined ? true : false

const isCheckBox = (p, field) => (p.data.get('fields').toJS().find(fld => fld.field_name === field).input_type) === 'checkbox' ? true : false

export const buildField = (p, field) => {
    const mode = p.data.get('mode')
    const readonly = p.data.get('fields')
        .toJS()
        .find(fld => fld.field_name === field).readonly
    const label = p.data.get('fields')
        .toJS()
        .find(fld => fld.field_name === field).label

    const value = p.ref_hash[field] && p.current.get(field) ? p.ref_hash[field](p.current.get(field))
        : (hasRadioGroup(p, field) ? radioGroupDisplayValue(p, field)
            : (isCheckBox(p, field)) ? checkboxDisplayValue(p, field)
                : p.current.get(field))

    return (mode === 'display' || readonly)
        ? buildDisplayField(value, label)
        : buildEditField(p, field, value, label)
}
