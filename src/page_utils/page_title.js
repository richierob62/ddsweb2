import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getPageTitle } from '../selectors'

const mstp = (state, ownProps) => ({
  title: getPageTitle(state[ownProps.page])
})

const StyledWrapper = styled.h1`
  color: rgba(26, 26, 26, 0.45);
  font-weight: lighter;
  font-size: 1.5rem;
  border-bottom: 1px solid rgba(128, 128, 128, 0.47);
  margin-bottom: 10px;
`

const PageTitle = ({ title }) => <StyledWrapper>{title}</StyledWrapper>

export default connect(mstp)(PageTitle)
