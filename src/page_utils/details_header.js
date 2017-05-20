import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Tab from './details_tab'
import { getCurrentRecord, getTabNames, getCurrentTab, getActionWord } from '../selectors'

const mstp = (state, ownProps) => ({
    current_record: getCurrentRecord(state[ownProps.page]),
    tab_names: getTabNames(state[ownProps.page]),
    current_tab: getCurrentTab(state[ownProps.page]),
    action_word: getActionWord(state[ownProps.page])
})

const HeaderWrapper = styled.div`
    color: rgba(26, 26, 26, 0.74);
    font-weight: lighter;
    font-size: 1rem;
    margin-bottom: -8px;
    margintop: 10px;
`


const TabWrapper = styled.div`
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

const DetailsHeader = (props) => {

    const {
        current_record,
        tab_names,
        current_tab,
        action_word,
        dispatch,
    } = props

    return (
        <div>
            <HeaderWrapper>
                {current_record
                    ? `${current_record.get('name')} - Acc# ${current_record.get('account_num')}`
                    : 'No current selection'
                }
            </HeaderWrapper>
            {
                current_record &&
                <TabWrapper>
                    {
                        tab_names.size < 2 ?
                            null :
                            tab_names.map(name => <Tab
                                key={name}
                                name={name}
                                is_current={name === current_tab}
                                action_word={action_word}
                                dispatch={dispatch}
                            />)
                    }
                </TabWrapper>
            }
        </div>
    )
}

export default connect(mstp)(DetailsHeader)
