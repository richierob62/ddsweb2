import React from 'react'
import PageTitle from './page_title'
import PageList from './page_list'
import PageDetails from './page_details'
import PageContextMenu from './page_context_menu'
import styled from 'styled-components'

const Page = styled.div`

`

const MainPageSection = styled.div`
    display:flex;
    flex-direction: column;
`

const DetailsSection = styled.div`
    display:flex;
`

const buildPage = page => {
    return (
        <Page>
            <PageTitle page={page} />
            <MainPageSection>
                <PageList page={page} />
                <DetailsSection>
                    <PageDetails page={page} />
                    <PageContextMenu page={page} />
                </DetailsSection>
            </MainPageSection>
        </Page>
    )
}

export default buildPage
