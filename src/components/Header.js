import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  grid-area: header;
  height: 100%
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #8e44ad;

  h1 {
    color: rgba(255, 255, 255, 0.7);
    font-size: 2rem;
  }
`

const Header = () => (
  <HeaderWrapper>
    <h1>DDSWeb Directory Data Manager</h1>
  </HeaderWrapper>
)

export default Header
