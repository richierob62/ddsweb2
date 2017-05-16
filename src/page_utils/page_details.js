import React from 'react'
import styled from 'styled-components'


const DetailsWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 1px solid red;
`

const DetailsHeader = styled.div`
    color: rgba(26, 26, 26, 0.74);
    font-weight: lighter;
    font-size: 1rem;
    margin-bottom: -8px;
    margintop: 10px;
    border: 1px solid blue;
`
const TabSection = styled.div`
    display: flex;
    color: rgb(162, 156, 156);
    font-weight: 100;
    font-size: .9rem;
    margin-bottom: 10px;
    padding-top: .5rem;
    border-bottom: ${props => props.current
        ? '1px solid rgb(201, 71, 225)'
        : 'none'};
`

const FieldsSection = styled.div`

`

// import buildTabs from '../component_utils/details_tabs'
// import layOutFields from '../component_utils/details_layout'
// import styled from 'styled-components'

// {current
//     ? `${current.get('name')} - Acc# ${current.get('account_num')}`
//     : 'No current selection'
// }

// {current
//     ? buildTabs(current, data, dispatch_obj)
//     : ''
// }

const buildPageDetails = ({ page }) => (
    <DetailsWrapper>
        <DetailsHeader>

        </DetailsHeader>
        <TabSection>

        </TabSection>
        <FieldsSection>
            {page}
        </FieldsSection>
    </DetailsWrapper>
)

export default buildPageDetails
