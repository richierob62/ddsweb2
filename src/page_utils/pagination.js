import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import actions from '../actions'
import { getFirstIndexInList, getListSize } from '../selectors'
import proper_camel from '../utils/proper_camel'

const mstp = (state, { page }) => ({
  first_index: getFirstIndexInList(state[page]),
  list_size: getListSize(state[page]),
  page
})

const PaginationWrapper = styled.div`text-align: center;`

const PrevIcon = styled.i`
  color: ${props =>
    props.first_index === 0 ? 'rgba(118, 118, 118, 0.3)' : '#767676'};
  padding: 5px;
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    color: ${props =>
      props.first_index === 0 ? 'rgba(118, 118, 118, 0.3)' : '#8E44AD'};
  }
`

const NextIcon = styled.i`
  color: ${props =>
    props.first_index + 5 >= props.list_size
      ? 'rgba(118, 118, 118, 0.3)'
      : '#767676'};
  padding: 5px;
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    color: ${props =>
      props.first_index + 5 >= props.list_size
        ? 'rgba(118, 118, 118, 0.3)'
        : '#8E44AD'};
  }
`

const Counter = styled.span`font-size: 0.7rem;`

const pagination = props => {
  const { dispatch, page, first_index, list_size } = props

  // prev_handler
  const prev_handler_action_name = 'previous' + proper_camel(page) + 'Sublist'
  const prev_handler = () => dispatch(actions[prev_handler_action_name]())

  // next_handler
  const next_handler_action_name = 'next' + proper_camel(page) + 'Sublist'
  const next_handler = () => dispatch(actions[next_handler_action_name]())

  return (
    <PaginationWrapper>
      <PrevIcon
        first_index={first_index}
        onClick={prev_handler}
        className="fa fa-backward"
        aria-hidden="true"
      />
      <Counter>
        {list_size > 0 ? (
          `${first_index + 1} to ${Math.min(
            first_index + 5,
            list_size
          )} of ${list_size} matches`
        ) : (
          `0 matches`
        )}
      </Counter>
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
