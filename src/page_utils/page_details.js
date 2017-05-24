import React from 'react'
import styled from 'styled-components'
import DetailsHeader from '../page_utils/details_header'
import DetailsLayout from '../page_utils/details_layout'


const DetailsWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

const PageDetails = ({ page }) => (
    <DetailsWrapper>
        <DetailsHeader page={page} />
        <DetailsLayout page={page} />
    </DetailsWrapper>
)

export default PageDetails
