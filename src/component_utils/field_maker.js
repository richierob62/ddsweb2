import React from 'react'
import createEventDispatcher from './create_dispatcher'
import styled from 'styled-components'

// dispatchers
const createTypeaheadEventDispatcher = (p, field) => {
    const { dispatch, act } = p
    const action = field + 'TypeaheadChange'
    const func = act[action]
    return (payload) => dispatch(func(payload))
}

// styled components
const StyledEditableText = styled.input`
    flex: 1;
    font-size: .75rem;
    color: rgb(201, 71, 225);
    border: none;
    border-bottom: 1px solid #767676;
    margin-left: .75rem;
    margin-right: 2rem;
`

const StyledLabel = styled.label`
    color: rgba(26, 26, 26, 0.75);
    font-weight: lighter;
    font-size: .75rem;
    margin-right: 5px;
    margin-bottom: 0;
    margin-top: 1px;
    min-width: 100px;
    text-align: right;
`

const StyledSelect = styled.select`
    display: inline-block;
    max-width: 100%;
    height: calc(1.6rem - 2px);
    padding: 2px 1.75rem 2px 2px;
    color: rgb(42, 5, 49);
    vertical-align: middle;
    margin-top: -4px;
    margin-left: 5px;    
    border: 1px solid rgb(201, 71, 225);
    border-radius: .25rem;
    font-size: .75rem;

    option {
        color: rgb(42, 5, 49);
    }
`

const DisplayOnlyInput = styled.input`
    flex: 1;
    border: none;
    font-size: .8rem;
    color: rgb(42, 5, 49);
`

const StyledTypeahead = styled.div`

        position: relative;
        cursor: pointer;

        > input {
            position: absolute;
            z-index: 100;
            display: block;
            max-width: 100%;
            min-width: 12rem;
            height: calc(1.6rem - 2px);
            padding: 2px 5px;
            color: rgb(42, 5, 49);
            vertical-align: middle;
            margin-top: -4px;
            margin-left: 5px;    
            border: 1px solid rgb(201, 71, 225);
            border-radius: .25rem;
            font-size: .75rem;
        }

        #options_box {
            position: absolute;
            background: white;
            min-width: 12rem;
            margin-left: 5px;    
            top: 1.3rem;
            width: 100%;
            z-index: 101;
            color: rgb(42, 5, 49);
            border: 1px solid rgb(201, 71, 225);
            border-radius: .25rem;
            font-size: .75rem;    

            > div {
                padding: 3px;
            }

            > div:hover, > div:focus {
                background: #b9cae3;
            }
        }

`

const StyledDate = styled.input`
    font-size: .75rem;
    color: rgb(201, 71, 225);
    border: none;
    border-bottom: 1px solid #767676;
    margin-left: .75rem;
    margin-right: 2rem;
`

const StyledCheckboxOrRadioDescription = styled.span`
    font-size: .75rem;
    color: rgb(201, 71, 225);
    border: none;
    vertical-align: middle;
    display: inline-block;
    margin-top: 2px;
    margin-bottom: -2px;
`

// component functions

const editable_text_input = (p, field, value) => {

    const change_handler = createEventDispatcher('change', 'Data', p)

    const changeHandler = (field, e) => {
        change_handler({
            field,
            value: e.currentTarget.value
        })
    }
    return <StyledEditableText type="text" value={value} onChange={changeHandler.bind(null, field)} />
}

const select = (p, field, value) => {

    const ref_list = p.ref_lists[field]

    const select_rows = () => {
        if (!ref_list) return null;
        return ref_list.map(option => {
            return <option key={option.id} value={option.id}>{option.display}</option>
        })
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
        <StyledSelect value={selected_id} onChange={clickHandler.bind(null, field)}>
            {select_rows()}
        </StyledSelect>
    )
}

const typeahead = (p, field, value) => {

    const current_value = value || p.typeaheads[field]

    const change_handler = createEventDispatcher('change', 'Data', p)

    const typeahead_handler = createTypeaheadEventDispatcher(p, field)

    const name_list_needed = p.data.get('fields')
        .toJS()
        .find(fld => fld.field_name === field)
        .ref_table

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
                        key={option.id}
                        tabIndex="-1"
                        onClick={optionSelectHandler.bind(null, option.id)}
                        onKeyUp={handleKeyUpOption.bind(null, option.id)}
                    >
                        {option.display}
                    </div>
                )
            })
        return (
            <div
                id="options_box"
                ref={input !== undefined ? () => { } : e => input = e}
            >
                {option_items}
            </div>
        )
    }

    return (
        <StyledTypeahead>
            <input type="text"
                value={current_value}
                onChange={changeHandler.bind(null, field)}
                onKeyUp={handleKeyUpInput} />
            {!value_is_exact_match(current_value) && renderOptionsBox()}
        </StyledTypeahead>
    )
}

const radio = (p, field) => {

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
                        <StyledCheckboxOrRadioDescription>{option.display}</StyledCheckboxOrRadioDescription>
                    </label>
                )
            })
    }

    return (
        <div>
            {renderOptions()}
        </div>
    )
}

const dateInput = (p, field, value) => {

    const change_handler = createEventDispatcher('change', 'Data', p)

    const handleChange = e => {
        change_handler({
            field,
            value: e.currentTarget.value
        })
    }
    return (
        <StyledDate type="date" value={value ? value : new Date()} onChange={handleChange} />
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
            <StyledCheckboxOrRadioDescription>{value}</StyledCheckboxOrRadioDescription>
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
    const holder_style = {
        display: 'flex'
    }
    return (
        <div style={holder_style}>
            <StyledLabel>{label}:</StyledLabel>        
            {buildMatchingElement(p, field, value)}
        </div>
    )
}

const buildDisplayField = (current_value, label) => {

    const holder_style = {
        display: 'flex'
    }
    return (
        <div style={holder_style}>
            <StyledLabel>{label}:</StyledLabel>
            <DisplayOnlyInput type="text" value={current_value} onChange={() => { }} />
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
