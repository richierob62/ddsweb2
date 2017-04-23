import React from 'react'
import buildPageTitle from './page_title'
import buildPageList from './page_list'
import buildPageDetails from './page_details'
import buildPageContextMenu from './page_context_menu'

export const buildPage = p => {
    const title = p.data.get('page_title')
    return (
        <div className={'page_title'}>
            {buildPageTitle(title)}
            <div className="page-vertical">
                {buildPageList(p)}
                <div className="page-lower">
                    {buildPageDetails(p)}
                    {buildPageContextMenu(p)}
                </div>
            </div>
        </div>
    )
}