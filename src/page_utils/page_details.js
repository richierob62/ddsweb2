import React from 'react'
import styled from 'styled-components'
import DetailsHeader from '../page_utils/details_header'
import DetailsLayout from '../page_utils/details_layout'

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid rgba(44, 62, 80, 0.5);
  border-radius: 15px;
  padding: 10px;
  aligh-items: center;
}
`

const PageDetails = ({ page }) => (
  <DetailsWrapper>
    <DetailsHeader page={page} />
    <DetailsLayout page={page} />
  </DetailsWrapper>
)

export default PageDetails
