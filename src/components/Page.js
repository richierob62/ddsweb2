import React from 'react';
import styled from 'styled-components'


const StyledPage = styled.div`
    flex: 1;
    background-color: white;
    border-left: 1px solid cadetblue;
    padding: 1rem;
`

const Page = (props) => <StyledPage>{props.children}</StyledPage>

export default Page;