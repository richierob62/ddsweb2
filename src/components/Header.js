import React from 'react';
import styled from 'styled-components'

const StyledH1 = styled.h1`
    background-color: #9c27b0;
    color: rgba(255,255,255,.7);
    text-align: center;
    padding: 10px 5px;
`

const Header = () => <StyledH1>This is the header</StyledH1>

export default Header;