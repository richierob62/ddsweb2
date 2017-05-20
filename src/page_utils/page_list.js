import React from 'react'
import styled from 'styled-components'
import LabelCells from '../page_utils/label_cells'
import FilterCells from '../page_utils/filter_cells'
import DataRows from '../page_utils/data_rows'

const PageListWrapper = styled.div`

`
const PageList = ({ page }) => (
    <PageListWrapper>
        <table className={'table table-sm'} style={{ border: 'none' }} >
            <thead style={{ paddingBottom: '.5rem' }}>
                <LabelCells page={page} />
                <FilterCells page={page} />
            </thead>
            <DataRows page={page} />
        </table>
    </PageListWrapper>
)

export default PageList