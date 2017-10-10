import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Tab from './details_tab'
import {
  getCurrentRecord,
  getTabNames,
  getCurrentTab,
  getDetailsLabelField
} from '../selectors'

const mstp = (state, { page }) => ({
  current_record: getCurrentRecord(state[page]),
  tab_names: getTabNames(state[page]),
  current_tab: getCurrentTab(state[page]),
  details_label_field: getDetailsLabelField(state[page]),
  page
})

const HeaderWrapper = styled.div`
  color: rgba(26, 26, 26, 0.74);
  font-weight: lighter;
  font-size: 1rem;
  margin-bottom: -10px;
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
  const {
    current_record,
    details_label_field,
    tab_names,
    current_tab,
    page,
    dispatch
  } = props

  return (
    <div>
      {current_record && (
        <HeaderWrapper>{current_record.get(details_label_field)}</HeaderWrapper>
      )}
      {current_record && (
        <TabWrapper>
          {tab_names.size < 2
            ? null
            : tab_names.map(name => (
                <Tab
                  key={name}
                  name={name}
                  is_current={name === current_tab}
                  page={page}
                  dispatch={dispatch}
                />
              ))}
        </TabWrapper>
      )}
    </div>
  )
}

export default connect(mstp)(DetailsHeader)
