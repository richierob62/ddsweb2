import React from 'react'
import createEventDispatcher from './create_dispatcher'
import styled from 'styled-components'

const buildFieldObject = (acc, field) => {
    acc[field.get('field_name')] = field.get('label')
    return acc
}

const createLabelCells = p => {

    const {dispatch, act, data } = p
    const dispatch_obj = { dispatch, act, data }

    const labels = data.get('fields')
        .reduce(buildFieldObject, {})
    const list_template = data.get('list_template').toJS()
    const current_sort = data.get('current_sort').toJS()
    const sort_handler = createEventDispatcher('change', 'Sort', dispatch_obj)
    return list_template.map(col => {

        const StyledTableHeader = styled.th`
            width: ${col.width};
            border: 'none',
            padding-bottom: '0'
        `

        const StyledColumnLabel = styled.span`
            font-size: .7rem;
            font-weight: normal;
            color: rgb(58, 57, 57);
            margin-bottom: 0px;
            padding-left: .1rem;    
            text-transform:uppercase          
        `

        const StyledSortIndicator = styled.span`
            color: '#767676',
            paddingLeft: '5px'
        `

        const sort_field = current_sort.field_name
        const sort_direction = current_sort.direction
        const sort_indicator = (sort_field === undefined) ? ''
            : (sort_field !== col.field_name) ? ''
                : (sort_direction === 'ASC') ? <i className="fa fa-sort-asc" aria-hidden="true"></i>
                    : <i className="fa fa-sort-desc" aria-hidden="true"></i>
        return (
            <StyledTableHeader 
                key={'label-' + col.field_name}
                onClick={sort_handler.bind(null, col.field_name)}
            >
                <StyledColumnLabel>{labels[col.field_name]}</StyledColumnLabel>
                <StyledSortIndicator> {sort_indicator}</StyledSortIndicator>
            </StyledTableHeader>
        )
    })
}

export default createLabelCells
