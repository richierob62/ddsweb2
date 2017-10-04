import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import actions from '../actions'
import { getFirstIndexInList, getListSize } from '../selectors'

const mstp = (state, { page }) => ({
  first_index: getFirstIndexInList(state[page]),
  list_size: getListSize(state[page]),
  page
})

const PaginationWrapper = styled.div`text-align: center;`

const PrevIcon = styled.i`
  color: ${props =>
    props.first_index === 0 ? 'rgba(118, 118, 118, 0.48)' : '#767676'};
  padding: 5px;
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    color: ${props =>
      props.first_index === 0 ? 'rgba(118, 118, 118, 0.48)' : '#8E44AD'};
  }
`

const NextIcon = styled.i`
  color: ${props =>
    props.first_index + 5 >= props.list_size
      ? 'rgba(118, 118, 118, 0.48)'
      : '#767676'};
  padding: 5px;
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    color: ${props =>
      props.first_index + 5 >= props.list_size
        ? 'rgba(118, 118, 118, 0.48)'
        : '#8E44AD'};
  }
`

const pagination = props => {
  const { dispatch, page, first_index, list_size } = props

  // prev_handler
  const prev_handler_action_name = 'previous' + page + 'Sublist'
  const prev_handler = () => dispatch(actions[prev_handler_action_name]())

  // next_handler
  const next_handler_action_name = 'next' + page + 'Sublist'
  const next_handler = () => dispatch(actions[next_handler_action_name]())

  return (
    <PaginationWrapper>
      <PrevIcon
        first_index={first_index}
        onClick={prev_handler}
        className="fa fa-backward"
        aria-hidden="true"
      />
      <NextIcon
        first_index={first_index}
        list_size={list_size}
        onClick={next_handler}
        className="fa fa-forward"
        aria-hidden="true"
      />
    </PaginationWrapper>
  )
}

export default connect(mstp)(pagination)
