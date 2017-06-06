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

const OptionsWrapper = styled.div`
    flex: 1;
    font-size: .8rem;
    color: #2C3E50;
    border: none;
    margin-left: .75rem;
    margin-right: 2rem;

`

const RadioOptionDisplay = styled.span`
    font-size: .75rem;
    color: #2C3E50;
    border: none;
    vertical-align: middle;
    display: inline-block;
    margin-top: 2px;
    margin-bottom: -2px;
`

const comp = (props) => {

    const {
        options,
        value,
        label,
        action_word,
        dispatch,
        field_name,
     } = props

    // select_handler
    const select_handler_action_name = 'change' + action_word + 'Data'
    const select_handler = (selected) => {
        dispatch(actions[select_handler_action_name]({ field: field_name, value: selected }))
    }

    const option_display_values = options.map(option => {
        return (
            <label className="custom-control custom-radio" key={option.get('id')} >
                <input
                    type="radio"
                    className="custom-control-input"
                    checked={option.get('id') === value}
                    onChange={select_handler.bind(null, option.get('id'))}
                />
                <span className="custom-control-indicator"></span>
                <RadioOptionDisplay>{option.get('display')}</RadioOptionDisplay>
            </label>
        )
    })

    return <Wrapper>
        <StyledLabel>{label}:</StyledLabel>
        <OptionsWrapper>
            {option_display_values}
        </OptionsWrapper>
    </Wrapper>


}

export default comp
