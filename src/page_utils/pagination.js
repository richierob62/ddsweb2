import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import actions from '../actions'
import { getFirstIndexInList, getActionWord, getListSize } from '../selectors'

const mstp = (state, ownProps) => ({
    first_index: getFirstIndexInList(state[ownProps.page]),
    list_size: getListSize(state[ownProps.page]),
    action_word: getActionWord(state[ownProps.page])
})

const PaginationWrapper = styled.div`
    text-align: center;
`

const PrevIcon = styled.i`
    color: ${ props => props.first_index === 0 ? 'rgba(118, 118, 118, 0.48)' : '#767676' };
    padding: 5px;
    cursor: pointer;
    margin: 0 10px;

    &:hover {
        color: ${ props => props.first_index === 0 ? 'rgba(118, 118, 118, 0.48)' : '#9c27b0' };
    }
`

const NextIcon = styled.i`
    color: ${ props => props.first_index + 5 >= props.list_size ? 'rgba(118, 118, 118, 0.48)' : '#767676' };
    padding: 5px;
    cursor: pointer;
    margin: 0 10px;

    &:hover {
        color: ${ props =>  props.first_index + 5 >= props.list_size ? 'rgba(118, 118, 118, 0.48)' : '#9c27b0' };
    }
`

const pagination = (props) => {

    const {
        dispatch,
        action_word,
        first_index,
        list_size,
        } = props

    // prev_handler
    const prev_handler_action_name = 'previous' + action_word + 'Sublist'
    const prev_handler = () => dispatch(actions[prev_handler_action_name]())

    // next_handler
    const next_handler_action_name = 'next' + action_word + 'Sublist'
    const next_handler = () => dispatch(actions[next_handler_action_name]())

    return (
        <PaginationWrapper>
            <PrevIcon first_index={first_index} onClick={prev_handler} className="fa fa-backward" aria-hidden="true"/>
            <NextIcon first_index={first_index} list_size={list_size} onClick={next_handler} className="fa fa-forward" aria-hidden="true"/>
        </PaginationWrapper>
    )
}

export default connect(mstp)(pagination)
