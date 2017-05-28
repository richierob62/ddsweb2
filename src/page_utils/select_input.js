import React from 'react'
import styled from 'styled-components'
import actions from '../actions'

const Wrapper = styled.div`
    display: flex;
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
const DisplayOnlyInput = styled.input`
    flex: 1;
    border: none;
    font-size: .8rem;
    color: rgb(42, 5, 49);
`

const EditableSelect = styled.select`
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
const comp = (props) => {

    const {
        label,
        field_name,
        value,
        action_word,
        dispatch,
        display,
        ref_function,
        ref_list,
    } = props

    const select_options = ref_list.map(option => {
        return <option key={option.get('id')} value={option.get('id')}>{option.get('display')}</option>
    })

    const value_to_display = ref_function(value).get('display')

    // change_handler
    const change_handler_action_name = 'change' + action_word + 'Data'
    const change_handler = (fld, e) => {
        dispatch(actions[change_handler_action_name]({ field: field_name + '_id', value: parseInt(e.currentTarget.value) }))
    }

    return (
        <Wrapper>
            <StyledLabel>{label}:</StyledLabel>
            {
                display === true ?
                    <DisplayOnlyInput type="text" value={value_to_display} onChange={() => { }} /> :
                    <EditableSelect type="text" value={value} onChange={change_handler.bind(null, field_name)}>
                        {select_options}
                    </EditableSelect>
            }
        </Wrapper>
    )
}
export default comp