import React from 'react'
import { buildField } from './field_maker'
import styled from 'styled-components'

const DetailField = styled.div`
    flex: 1;
    margin-top: 9px;
    margin-bottom: 3px;
`

const buildDetailRow = (p, row) => {
    return row.map(field => {
        return <DetailField key={field}>{buildField(p, field)}</DetailField>
    })
}

export default buildDetailRow
