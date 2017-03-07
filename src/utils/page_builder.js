import React from 'react'
import { createEventDispatcher, buildField, createDataRows, createLink, buttons } from '../components/component_parts'

const createFilterCells = p => {
    const list_template = p.data.get('list_template').toJS()
    const filter_handler = createEventDispatcher('change', 'Filter', p)
    const current_filters = p.data.get('current_filters').toJS()
    return list_template.map(col => {
        const cell_value = current_filters[col.field_name] ? current_filters[col.field_name] : ''
        const th_style = {
            width: col.width,
            paddingBottom: '0px',
            paddingTop: '0px',
            marginBottom: '0px',
            border: 'none'
        }
        const input_style = {
            marginTop: '0px',
            marginBottom: '0px'
        }
        const call_handler = (col, e) => {
            filter_handler({ column: col, value: e.currentTarget.value })
        }
        return (
            <th key={'filter-' + col.field_name} style={th_style} className="">
                <input type='text'
                    style={input_style}
                    className="form-control"
                    value={cell_value}
                    onChange={call_handler.bind(null, col.field_name)}
                />
            </th>
        )
    })
}

const buildDetailRow = (p, row) => {
    return row.map(field => {
        const field_style = {
            flex: 1,
            marginTop: '9px',
            marginBottom: '3px',
        }
        return <div style={field_style} key={field}>{buildField(p, field)}</div>
    })
}

const layOutFields = (p) => {
    if (!p.current) return null
    const current_tab = p.data.getIn(['details_template', 'current_tab'])
    const rows = p.data.getIn(['details_template', 'tabs']).toJS()
        .filter(tab => tab.name === current_tab)[0].rows
    const row_style = {
        display: 'flex',
        fontSize: '0.7rem',
        width: '100%',
        flexWrap: 'nowrap'
    }
    return rows.map((row, idx) => {
        return (
            <div style={row_style} key={idx}>
                {buildDetailRow(p, row)}
            </div>
        )
    })
}

const buildDetailsHeader = p => {
    const header_style = {
        color: 'rgba(26, 26, 26, 0.74)',
        fontWeight: 'lighter',
        fontSize: '1rem',
        marginBottom: '10px',
        marginTop: '10px'
    }
    return (
        p.current
            ? <h5 style={header_style}>`{p.current.get('name')} - Acc# {p.current.get('account_num')}`</h5>
            : <h5 style={header_style}>No current selection</h5>
    )
}

const buildTabs = p => {
    if (!p.current) return null
    const tabs = p.data.getIn(['details_template', 'tabs']).toJS()
    const current_tab = p.data.getIn(['details_template', 'current_tab'])
    const tab_select_handler = createEventDispatcher('select', 'Tab', p)
    const clickHandler = (tab) => {
        tab_select_handler(tab)
    }
    return tabs.map(tab => {
        const tab_style = {
            border: tab.name === current_tab ? '2px solid rgb(89, 140, 215)' : '1px solid #767676',
            marginBottom: tab.name === current_tab ? '-1px' : '0',
            padding: '4px 20px',
            borderTopLeftRadius: '14px',
            borderTopRightRadius: '14px',
            marginRight: '1.5rem',
            borderBottom: tab.name === current_tab ? '2px solid white' : 'none',
            cursor: 'pointer',
        }
        return <div key={tab.name} style={tab_style} onClick={clickHandler.bind(null, tab.name)}>{tab.name}</div>
    })
}

const buildFieldObject = (acc, field) => {
    acc[field.get('field_name')] = field.get('label')
    return acc
}

const createLabelCells = p => {
    const labels = p.data.get('fields')
        .reduce(buildFieldObject, {})
    const list_template = p.data.get('list_template').toJS()
    const current_sort = p.data.get('current_sort').toJS()
    const sort_handler = createEventDispatcher('change', 'Sort', p)
    return list_template.map(col => {
        const th_style = {
            width: col.width,
            border: 'none',
            paddingBottom: '0'
        }
        const label_style = {
            fontSize: '.7rem',
            fontWeight: 'normal',
            color: 'rgb(58, 57, 57)',
            marginBottom: '0px',
            paddingLeft: '.1rem'
        }
        const sort_style = {
            color: '#767676',
            paddingLeft: '5px'
        }
        const sort_field = current_sort.field_name
        const sort_direction = current_sort.direction
        const sort_indicator = (sort_field === undefined) ? ''
            : (sort_field !== col.field_name) ? ''
                : (sort_direction === 'ASC') ? <i className="fa fa-sort-asc" aria-hidden="true"></i>
                    : <i className="fa fa-sort-desc" aria-hidden="true"></i>
        return (
            <th key={'label-' + col.field_name}
                style={th_style}
                onClick={sort_handler.bind(null, col.field_name)}
            >
                <span style={label_style} className="text-uppercase">{labels[col.field_name]}</span>
                <span style={sort_style}>{sort_indicator}</span>
            </th>
        )
    })
}

const buildPageDetails = p => {
    const tab_style = {
        display: 'flex',
        color: 'rgb(162, 156, 156)',
        fontWeight: '100',
        fontSize: '.9rem',
        marginBottom: '10px',
        paddingTop: '.5rem',
        borderBottom: p.current ? '2px solid rgb(89, 140, 215)' : 'none'
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
            <div>{buildDetailsHeader(p)}</div>
            <div style={tab_style}>{p.current ? buildTabs(p) : ''}</div>
            <div style={field_section_style}>{layOutFields(p)}</div>
        </div>
    )
}

const buildPageContextMenu = p => {
    if (!p.current) return null
    const menu_style = {
        width: '15%',
        marginTop: '50px',
        paddingLeft: '20px',
        color: 'rgb(162, 156, 156)',
        fontWeight: '100',
        fontSize: '0.9rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
    const para_style = {
        marginBottom: '0',
        paddingBottom: '0',
    }
    const links = p.data.get('context_menu').toJS()
        .map(link => createLink(p, link))
    return (
        <div style={menu_style}>
            <p style={para_style} >Related Items</p>
            {links}
            {buttons(p)}
        </div>
    )
}

const buildPageList = p => {
    return (
        <div>
            <table className={'table table-sm table-striped table-hover'} style={{ border: 'none' }} >
                <thead style={{ paddingBottom: '.5rem' }}>
                    <tr>{createLabelCells(p)}</tr>
                    <tr>{createFilterCells(p)}</tr>
                </thead>
                <tbody>{createDataRows(p)}</tbody>
            </table>
        </div>
    )
}

const buildPageTitle = p => {
    const title = p.data.get('page_title')
    return <h1 className="page-title">{title}</h1>
}

export const buildPage = props => {
    return (
        <div className={'page_title'}>
            {buildPageTitle(props)}
            <div className="page-vertical">
                {buildPageList(props)}
                <div className="page-lower">
                    {buildPageDetails(props)}
                    {buildPageContextMenu(props)}
                </div>
            </div>
        </div>
    )
}