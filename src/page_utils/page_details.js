import React from 'react'
import styled from 'styled-components'
import DetailsHeader from '../component_utils/details_header'


const DetailsWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

const FieldsSection = styled.div`

`

const PageDetails = ({ page }) => (
    <DetailsWrapper>
        <DetailsHeader page={page} />
        <FieldsSection page={page} />
    </DetailsWrapper>
)

export default PageDetails
