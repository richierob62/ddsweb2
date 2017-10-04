import React from 'react'
import styled from 'styled-components'
import LabelCells from '../page_utils/label_cells'
import FilterCells from '../page_utils/filter_cells'
import DataRows from '../page_utils/data_rows'
import Pagination from '../page_utils/pagination'
import { connect } from 'react-redux'
import { getMode } from '../selectors'
import { CSSTransitionGroup } from 'react-transition-group'

const mstp = (state, ownProps) => ({
  mode: getMode(state[ownProps.page])
})

const PageListWrapper = styled.div`margin-bottom: 1rem;`

const PageList = ({ page, mode }) => {
  return (
    <CSSTransitionGroup
      transitionName="list"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
    >
      {mode === 'display' && (
        <PageListWrapper key={'the_list'}>
          <table
            className={'table table-sm'}
            style={{ border: 'none', marginBottom: '2px' }}
          >
            <thead style={{ paddingBottom: '.5rem' }}>
              <LabelCells page={page} />
              <FilterCells page={page} />
            </thead>
            <DataRows page={page} />
          </table>
          <Pagination page={page} />
        </PageListWrapper>
      )}
    </CSSTransitionGroup>
  )
}

export default connect(mstp)(PageList)
