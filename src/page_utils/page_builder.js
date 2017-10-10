import React from 'react'
import PageTitle from './page_title'
import PageList from './page_list'
import PageDetails from './page_details'
import PageContextMenu from './page_context_menu'
import styled from 'styled-components'

const MainSectionLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px;
  grid-template-rows: 30px 1fr 2fr;
  grid-template-areas: 'title title' 'list list' 'details context';
`

const PageTitlePlacement = styled.div`grid-area: title;`
const PageListPlacement = styled.div`grid-area: list;`
const PageDetailsPlacement = styled.div`grid-area: details;`
const PageContextMenuPlacement = styled.div`grid-area: context;`

const buildPage = page => {
  return (
    <MainSectionLayout>
      <PageTitlePlacement>
        <PageTitle page={page} />
      </PageTitlePlacement>
      <PageListPlacement>
        <PageList page={page} />
      </PageListPlacement>
      <PageContextMenuPlacement>
        <PageContextMenu page={page} />
      </PageContextMenuPlacement>
      <PageDetailsPlacement>
        <PageDetails page={page} />
      </PageDetailsPlacement>
    </MainSectionLayout>
  )
}

export default buildPage
