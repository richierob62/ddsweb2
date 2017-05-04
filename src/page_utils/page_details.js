import React from 'react'
import buildTabs from '../component_utils/details_tabs'
import layOutFields from '../component_utils/details_layout'
import styled from 'styled-components'

const DetailsHeader = styled.h5`
    color: rgba(26, 26, 26, 0.74);
    font-weight: lighter;
    font-size: 1rem;
    margin-bottom: -8px;
    margintop: 10px;
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

const buildPageDetails = p => {

    const { dispatch, act, data, current } = p
    const dispatch_obj = {
        dispatch,
        act,
        data
    }

    const details_style = {
        width: '85%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    }

    return (
        <div style={details_style}>
            <DetailsHeader>
                {current
                    ? `${current.get('name')} - Acc# ${current.get('account_num')}`
                    : 'No current selection'
                }
            </DetailsHeader>
            <TabSection current={current}>
                {current
                    ? buildTabs(current, data, dispatch_obj)
                    : ''
                }
            </TabSection>
            <div>{layOutFields(p)}</div>
        </div>
    )
}

export default buildPageDetails
