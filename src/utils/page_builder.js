import React from 'react';
import R from 'ramda';

const createTableRowFromCells = (cells) => {
    const tr_style = {

    };
    return (
        <tr style={tr_style} >{cells}</tr>
    );
};

const _buildListHeader = (filter, label) => (
    <thead style={{ paddingBottom: '.5rem' }}>
        {label}
        {filter}
    </thead>
);

const addRowsToBody = (rows) => {
    const body_style = {

    }
    return (
        <tbody style={body_style}>
            {rows}
        </tbody>
    );
};

const _buildList = (header, body) => (
    <div>
        <table className={'table table-sm table-striped table-hover'} style={{ border: 'none' }} >
            {header}
            {body}
        </table>
    </div>
);

const _pageBuilder = (list, details, menu, title) => (
    <div className={title}>
        <h1 className="page-title">{title}</h1>
        <div className="page-vertical">
            {list}
            <div className="page-lower">
                {details}
                {menu}
            </div>
        </div>
    </div>
);

const _createFilterCells = (filter_values, filter_change, template) => {
    return template.map(col => {
        const cell_value = filter_values[col.field_name] ? filter_values[col.field_name] : '';
        const th_style = {
            width: col.width,
            paddingBottom: '0px',
            paddingTop: '0px',
            marginBottom: '0px',
            border: 'none'
        };
        const input_style = {
            marginTop: '0px',
            marginBottom: '0px'
        };
        return (
            <th key={'filter-' + col.field_name} style={th_style} className="">
                <input type='text'
                    style={input_style}
                    className="form-control"
                    value={cell_value}
                    onChange={filter_change.bind(null, col.field_name)}
                    />
            </th>
        );
    });
}

const _createLabelCells = (labels, template, sort, sort_change) => {
    return template.map(col => {
        const th_style = {
            width: col.width,
            border: 'none',
            paddingBottom: '0'
        };
        const label_style = {
            fontSize: '.7rem',
            fontWeight: 'normal',
            color: 'rgb(58, 57, 57)',
            marginBottom: '0px',
            paddingLeft: '.1rem'
        };
        const sort_style = {
            color: '#767676',
            paddingLeft: '5px'
        };
        const sort_indicator = !sort.field_name
            ? ''
            : sort.field_name !== col.field_name
                ? ''
                : sort.direction === 'ASC'
                    ? <i className="fa fa-sort-asc" aria-hidden="true"></i>
                    : <i className="fa fa-sort-desc" aria-hidden="true"></i>;
        return (
            <th key={'label-' + col.field_name}
                style={th_style}
                onClick={sort_change.bind(null, col.field_name)}
                >
                <span style={label_style} className="text-uppercase">{labels[col.field_name]}</span>
                <span style={sort_style}>{sort_indicator}</span>
            </th>
        );
    });
}

const _createDataRows = (lines, template, line_select, selected_id) => {
    return lines.map(line => {
        const line_style = (id) => ({
            backgroundColor: selected_id === id ? 'rgba(4, 66, 155, 0.28)' : ''
        });
        const tds = template.map(col => {
            const td_style = {
                width: col.width,
                fontSize: '.7rem',
                paddingLeft: '.9rem'
            };
            return (
                <td key={'body-' + col.field_name + line.id}
                    style={td_style}
                    >
                    {line[col.field_name]}
                </td>
            );
        });
        return <tr key={line.id} onClick={line_select.bind(null, line.id)} style={line_style(line.id)} >{tds}</tr>
    });
}


// reducer functions
const fields_to_labels_reducer = (acc, field) => {
    acc[field.field_name] = field.label;
    return acc;
};

// getters
const current_filters = R.lensPath(['data', 'current_filters']);
const current_sort = R.lensPath(['data', 'current_sort']);
const fields = R.lensPath(['data', 'fields']);
const action_word = R.lensPath(['data', 'action_word']);
const labels = R.pipe(R.view(fields), R.reduce(fields_to_labels_reducer, {}));
const line_select_event = (props) => (id) => props.dispatch(props.act.selectCustomer(id));
const list = R.lensPath(['data', 'list']);
const list_template = R.lensPath(['data', 'list_template']);
const page_title = R.lensPath(['data', 'page_title']);
const selected_id = R.lensPath(['data', 'selected_id']);

const createEvent = (fst, last) => (props) => (col_name, e) => {
    const { dispatch, act } = props;
    const action = fst + R.view(action_word, props) + last;
    dispatch(act[action](col_name, e.currentTarget.value));
};
const filter_change_event = createEvent('change', 'Filter');
const sort_change_event = createEvent('change', 'Sort');


// Next: Modify list to replace references with data before passing on
// Next: remove reference to customer

// to do
const buildDetails = (data) => { return <div>details</div> };
const buildContextMenu = (data) => { return <div>context menu</div> };

// pipes
const createDataRows = R.converge(_createDataRows, [R.view(list), R.view(list_template), line_select_event, R.view(selected_id)]);
const buildListBody = R.pipe(createDataRows, addRowsToBody);
const createFilterCells = R.converge(_createFilterCells, [R.view(current_filters), filter_change_event, R.view(list_template)]);
const createLabelCells = R.converge(_createLabelCells, [labels, R.view(list_template), R.view(current_sort), sort_change_event]);
const buildListFilterRow = R.pipe(createFilterCells, createTableRowFromCells);
const buildListLabelRow = R.pipe(createLabelCells, createTableRowFromCells);
const buildListHeader = R.converge(_buildListHeader, [buildListFilterRow, buildListLabelRow]);
const buildList = R.converge(_buildList, [buildListHeader, buildListBody]);


// export
export const pageBuilder = R.converge(_pageBuilder, [buildList, buildDetails, buildContextMenu, R.view(page_title)]);


