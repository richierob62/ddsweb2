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

const CheckboxDisplay = styled.div`
    font-size: .75rem;
    color: #2C3E50;
    border: none;
    vertical-align: middle;
    display: inline-block;
    margin-top: 2px;
    margin-bottom: -2px;

`

const CheckboxWrapper = styled.span`
    flex: 1;
    font-size: .8rem;
    color: #2C3E50;
    border: none;
    margin-left: .75rem;
    margin-right: 2rem;
`

const comp = (props) => {

    const {
        value,
        label,
        action_word,
        dispatch,
        field_name,
     } = props

    // select_handler
    const select_handler_action_name = 'change' + action_word + 'Data'
    const select_handler = () => {
        dispatch(actions[select_handler_action_name]({ field: field_name, value: value === 1 ? 0 : 1 }))
    }

    return <Wrapper>
        <StyledLabel>{label}:</StyledLabel>
        <CheckboxWrapper>
            <label className="custom-control custom-checkbox">
                <input
                    type="checkbox"
                    value={value === 1 ? 'on' : 'off'}
                    className="custom-control-input"
                    checked={value === 1 ? 'checked' : ''}
                    onChange={select_handler}
                />
                <span className="custom-control-indicator"></span>
                <CheckboxDisplay>{value === 1 ? 'Yes' : 'No'}</CheckboxDisplay>
            </label>
        </CheckboxWrapper>
    </Wrapper>


}

export default comp
