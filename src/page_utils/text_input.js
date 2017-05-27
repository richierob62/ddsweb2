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

const comp = (props) => {

    const {
        label,
        field_name,
        value,
        action_word,
        dispatch,
        display,
    } = props


    // change_handler
    const change_handler_action_name = 'change' + action_word + 'Data'
    const change_handler = (display === true) ?
        () => { } :
        (fld, e) => dispatch(actions[change_handler_action_name]({ field: field_name, value: e.currentTarget.value }))

    return (
        <Wrapper>
            <StyledLabel>{label}:</StyledLabel>
            <DisplayOnlyInput type="text" value={value} onChange={change_handler.bind(null, field_name)} />
        </Wrapper>
    )
}
export default comp