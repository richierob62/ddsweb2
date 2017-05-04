import React from 'react'
import buildDetailRow from './details_row'
import styled from 'styled-components'

const DetailRow = styled.div`
    display: flex;
    font-size: 0.7rem;
    width: 100%;
    flex-wrap: nowrap;
`

const layOutFields = p => {
    const { current, data } = p
    if (!current) return null
    const current_tab = data.getIn(['details_template', 'current_tab'])
    const rows = data.getIn(['details_template', 'tabs']).toJS()
        .filter(tab => tab.name === current_tab)[0].rows
    return rows.map((row, idx) => {
        return (
            <DetailRow key={idx}>
                {buildDetailRow(p, row)}
            </DetailRow>
        )
    })
}

export default layOutFields
