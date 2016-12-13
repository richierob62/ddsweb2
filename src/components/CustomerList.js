import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import { connect } from 'react-redux';
import * as sel from '../selectors';
import * as act from '../actions';

const cl = (props) => {

    const isSelected = (id) => props.selected_id === id ? 'selected' : '';

    const sortIndicator = (column_name) => {
        if(props.sort_field !== column_name ) return '';
        return props.sort_direction === 'ASC' ? 
        <i className="fa fa-sort-asc" aria-hidden="true"></i> : 
        <i className="fa fa-sort-desc" aria-hidden="true"></i> ;
    };
    const renderRows = () => {
        return props.list.map(row => {
            return (
                <tr id={'data-row-' + row.get('id') }
                    key={row.get('id')}
                    className={isSelected(row.get('id'))}
                    onClick={props.setSelected.bind(null, row.get('id'))}>
                    <td id={'table-body-customer-col-1'}>{row.get('name')}</td>
                    <td id={'table-body-customer-col-2'}>{row.get('address')}</td>
                    <td id={'table-body-customer-col-3'}>{row.get('city')}</td>
                    <td id={'table-body-customer-col-4'}>{row.get('state')}</td>
                    <td id={'table-body-customer-col-5'}>{row.get('zip')}</td>
                    <td id={'table-body-customer-col-6'}>{row.get('area')}</td>
                    <td id={'table-body-customer-col-7'}>{row.get('phone')}</td>
                    <td id={'table-body-customer-col-8'}>{row.get('account_num')}</td>
                    <td id={'table-body-customer-col-9'}>{row.get('sales_rep')}</td>
                </tr>
            );
        });
    };

    const filterChange = (column, e) => props.changeFilter(column, e.currentTarget.value);

    const setFilterValue = (column) => props.current_filters.get(column) ? props.current_filters.get(column) : '';

    return (
        <Table striped bordered condensed hover className={'table-fixedheader'}>
            <thead>
                <tr>
                    <th id={'table-filter-customer-col-1'} ><input id={'rass'} type='text' value={setFilterValue('name')} onChange={filterChange.bind(null, 'name')} /></th>
                    <th id={'table-filter-customer-col-2'} ><input type='text' value={setFilterValue('address')} onChange={filterChange.bind(null, 'address')} /></th>
                    <th id={'table-filter-customer-col-3'} ><input type='text' value={setFilterValue('city')} onChange={filterChange.bind(null, 'city')} /></th>
                    <th id={'table-filter-customer-col-4'} ><input type='text' value={setFilterValue('state')} onChange={filterChange.bind(null, 'state')} /></th>
                    <th id={'table-filter-customer-col-5'} ><input type='text' value={setFilterValue('zip')} onChange={filterChange.bind(null, 'zip')} /></th>
                    <th id={'table-filter-customer-col-6'} ><input type='text' value={setFilterValue('area')} onChange={filterChange.bind(null, 'area')} /></th>
                    <th id={'table-filter-customer-col-7'} ><input type='text' value={setFilterValue('phone')} onChange={filterChange.bind(null, 'phone')} /></th>
                    <th id={'table-filter-customer-col-8'} ><input type='text' value={setFilterValue('account_num')} onChange={filterChange.bind(null, 'account_num')} /></th>
                    <th id={'table-filter-customer-col-9'} ><input type='text' value={setFilterValue('sales_rep')} onChange={filterChange.bind(null, 'sales_rep')} /></th>
                </tr>
                <tr>
                    <th id={'table-head-customer-col-1'} onClick={props.changeSort.bind(null, 'name')} >Company Name {sortIndicator('name')} </th>
                    <th id={'table-head-customer-col-2'} onClick={props.changeSort.bind(null, 'address')} >Address {sortIndicator('address')} </th>
                    <th id={'table-head-customer-col-3'} onClick={props.changeSort.bind(null, 'city')} >City {sortIndicator('city')} </th>
                    <th id={'table-head-customer-col-4'} onClick={props.changeSort.bind(null, 'state')} >State {sortIndicator('state')} </th>
                    <th id={'table-head-customer-col-5'} onClick={props.changeSort.bind(null, 'zip')} >Zip {sortIndicator('zip')} </th>
                    <th id={'table-head-customer-col-6'} onClick={props.changeSort.bind(null, 'area')} >Area {sortIndicator('area')} </th>
                    <th id={'table-head-customer-col-7'} onClick={props.changeSort.bind(null, 'phone')} >Phone {sortIndicator('phone')} </th>
                    <th id={'table-head-customer-col-8'} onClick={props.changeSort.bind(null, 'account_num')} >Acc # {sortIndicator('account_num')} </th>
                    <th id={'table-head-customer-col-9'} onClick={props.changeSort.bind(null, 'sales_rep')} >Sales Rep {sortIndicator('sales_rep')} </th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </Table>
    );
};

const mapStateToProps = (state) => {
    return {
        list: sel.getCustomerList(state),
        selected_id: sel.getSelectedCustomerID(state),
        sort_field: sel.getCustomerSortField(state),
        sort_direction: sel.getCustomerSortDirection(state),
        current_filters: sel.getCustomerFilters(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSelected(id) { dispatch(act.selectCustomer(id)); },
        changeSort(column) { dispatch(act.changeCustomerSort(column)); },
        changeFilter(column, value) { dispatch(act.changeCustomerFilter(column, value)); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(cl);