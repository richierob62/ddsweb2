import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Tab from './details_tab'
import { getCurrentRecord, getTabNames, getCurrentTab } from '../selectors'

const mstp = (state, { page }) => ({
  current_record: getCurrentRecord(state[page]),
  tab_names: getTabNames(state[page]),
  current_tab: getCurrentTab(state[page]),
  page
})

const HeaderWrapper = styled.div`
  color: rgba(26, 26, 26, 0.74);
  font-weight: lighter;
  font-size: 1rem;
  margin-bottom: -10px;
  text-align: center;
  border-bottom: 1px solid rgba(44, 62, 80, 0.5);
`

const TabWrapper = styled.div`
  display: flex;
  color: rgb(162, 156, 156);
  font-weight: 100;
  font-size: 0.9rem;
  margin-bottom: 10px;
  padding-top: 0.5rem;
  border-bottom: ${props => (props.current ? '1px solid #2C3E50' : 'none')};
`

const DetailsHeader = props => {
  const { current_record, tab_names, current_tab, page, dispatch } = props

  return (
    <div>
      <HeaderWrapper>
        {current_record ? current_record.get('account_num') ? (
          `${current_record.get('name')} - Acc# ${current_record.get(
            'account_num'
          )}`
        ) : current_record.get('name') ? (
          `${current_record.get('name')}`
        ) : (
          ''
        ) : (
          'No current selection'
        )}
      </HeaderWrapper>
      {current_record && (
        <TabWrapper>
          {tab_names.size < 2 ? null : (
            tab_names.map(name => (
              <Tab
                key={name}
                name={name}
                is_current={name === current_tab}
                page={page}
                dispatch={dispatch}
              />
            ))
          )}
        </TabWrapper>
      )}
    </div>
  )
}

  export default connect(mstp)(DetailsHeader)
