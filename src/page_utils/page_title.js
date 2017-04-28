import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.h1`
    margin: 0;
    color: rgba(26, 26, 26, 0.45);
    font-weight: lighter;
    font-size: 1.5rem;
    border-bottom: 1px solid rgba(128, 128, 128, 0.47);
    margin-bottom: 10px;
`

const buildPageTitle = title => {
    return <StyledTitle>{title}</StyledTitle>
}

export default buildPageTitle
