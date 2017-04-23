import React from 'react'
import createLabelCells from '../component_utils/label_cells'
import createFilterCells from '../component_utils/filter_cells'
import createDataRows from '../component_utils/data_rows'


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




export default buildPageList