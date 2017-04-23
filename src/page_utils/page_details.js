import React from 'react'
import buildDetailsHeader from '../component_utils/details_header'
import buildTabs from '../component_utils/details_tabs'
import layOutFields from '../component_utils/details_layout'

const buildPageDetails = p => {

    const { dispatch, act, data, current } = p
    const dispatch_obj = { dispatch, act, data }

    const tab_style = {
        display: 'flex',
        color: 'rgb(162, 156, 156)',
        fontWeight: '100',
        fontSize: '.9rem',
        marginBottom: '10px',
        paddingTop: '.5rem',
        borderBottom: current ? '2px solid rgb(89, 140, 215)' : 'none'
    }
    const details_style = {
        width: '85%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    }
    const field_section_style = {

    }
    return (
        <div style={details_style}>
            <div>{buildDetailsHeader(current)}</div>
            <div style={tab_style}>{ current ? buildTabs( current, data, dispatch_obj ) : ''}</div>
            <div style={field_section_style}>{layOutFields(p)}</div>
        </div>
    )
}


export default buildPageDetails
