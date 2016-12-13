import React from 'react';
import CustomerList, { cl } from './CustomerList';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import test_configureStore from '../test_config/test_configureStore';

const store = test_configureStore();
const store_2 = test_configureStore();
store_2.dispatch = jest.fn();

it('renders without crashing', () => {
  const el = shallow(<CustomerList store={store} />);
  expect(shallowToJson(el)).toMatchSnapshot();
});

it('handles a line select', () => {
  const el = mount(<CustomerList store={store_2} />);
  el.find('#data-row-1').simulate('click');
  expect(store_2.dispatch).toBeCalledWith( {"payload": 1, "type": "SELECT_CUSTOMER"} );
});

it('handles a filter change 1', () => {
  const el = mount(<CustomerList store={store_2} />);
  el.find('#table-filter-customer-col-1 input').node.value = 'foo_1';
  el.find('#table-filter-customer-col-1 input').simulate('change');
  expect(store_2.dispatch).toBeCalledWith( {"column": "name", "type": "CHANGE_CUSTOMER_FILTER", "value": "foo_1"} );
});

it('handles a filter change 2', () => {
  const el = mount(<CustomerList store={store_2} />);
  el.find('#table-filter-customer-col-2 input').node.value = 'foo_2';
  el.find('#table-filter-customer-col-2 input').simulate('change');
  expect(store_2.dispatch).toBeCalledWith( {"column": "address", "type": "CHANGE_CUSTOMER_FILTER", "value": "foo_2"} );
});

it('handles a filter change 3', () => {
  const el = mount(<CustomerList store={store_2} />);
  el.find('#table-filter-customer-col-3 input').node.value = 'foo_3';
  el.find('#table-filter-customer-col-3 input').simulate('change');
  expect(store_2.dispatch).toBeCalledWith( {"column": "city", "type": "CHANGE_CUSTOMER_FILTER", "value": "foo_3"} );
});

it('handles a filter change 4', () => {
  const el = mount(<CustomerList store={store_2} />);
  el.find('#table-filter-customer-col-4 input').node.value = 'foo_4';
  el.find('#table-filter-customer-col-4 input').simulate('change');
  expect(store_2.dispatch).toBeCalledWith( {"column": "state", "type": "CHANGE_CUSTOMER_FILTER", "value": "foo_4"} );
});

it('handles a filter change 5', () => {
  const el = mount(<CustomerList store={store_2} />);
  el.find('#table-filter-customer-col-5 input').node.value = 'foo_5';
  el.find('#table-filter-customer-col-5 input').simulate('change');
  expect(store_2.dispatch).toBeCalledWith( {"column": "zip", "type": "CHANGE_CUSTOMER_FILTER", "value": "foo_5"} );
});

it('handles a filter change 6', () => {
  const el = mount(<CustomerList store={store_2} />);
  el.find('#table-filter-customer-col-6 input').node.value = 'foo_6';
  el.find('#table-filter-customer-col-6 input').simulate('change');
  expect(store_2.dispatch).toBeCalledWith( {"column": "area", "type": "CHANGE_CUSTOMER_FILTER", "value": "foo_6"} );
});

it('handles a filter change 7', () => {
  const el = mount(<CustomerList store={store_2} />);
  el.find('#table-filter-customer-col-7 input').node.value = 'foo_7';
  el.find('#table-filter-customer-col-7 input').simulate('change');
  expect(store_2.dispatch).toBeCalledWith( {"column": "phone", "type": "CHANGE_CUSTOMER_FILTER", "value": "foo_7"} );
});

it('handles a filter change 8', () => {
  const el = mount(<CustomerList store={store_2} />);
  el.find('#table-filter-customer-col-8 input').node.value = 'foo_8';
  el.find('#table-filter-customer-col-8 input').simulate('change');
  expect(store_2.dispatch).toBeCalledWith( {"column": "account_num", "type": "CHANGE_CUSTOMER_FILTER", "value": "foo_8"} );
});

it('handles a filter change 9', () => {
  const el = mount(<CustomerList store={store_2} />);
  el.find('#table-filter-customer-col-9 input').node.value = 'foo_9';
  el.find('#table-filter-customer-col-9 input').simulate('change');
  expect(store_2.dispatch).toBeCalledWith( {"column": "sales_rep", "type": "CHANGE_CUSTOMER_FILTER", "value": "foo_9"} );
});

it('handles a sort 1', () => {
  const el = mount(<CustomerList store={store_2} />);
  el.find('#table-head-customer-col-1').simulate('click');
  expect(store_2.dispatch).toBeCalledWith( {"payload": "name", "type": "CHANGE_CUSTOMER_SORT"} );
});

it('handles a sort 2', () => {
  const el = mount(<CustomerList store={store_2} />);
  el.find('#table-head-customer-col-2').simulate('click');
  expect(store_2.dispatch).toBeCalledWith( {"payload": "address", "type": "CHANGE_CUSTOMER_SORT"} );
});

it('handles a sort 3', () => {
  const el = mount(<CustomerList store={store_2} />);
  el.find('#table-head-customer-col-3').simulate('click');
  expect(store_2.dispatch).toBeCalledWith( {"payload": "city", "type": "CHANGE_CUSTOMER_SORT"} );
});

it('handles a sort 4', () => {
  const el = mount(<CustomerList store={store_2} />);
  el.find('#table-head-customer-col-4').simulate('click');
  expect(store_2.dispatch).toBeCalledWith( {"payload": "state", "type": "CHANGE_CUSTOMER_SORT"} );
});

it('handles a sort 5', () => {
  const el = mount(<CustomerList store={store_2} />);
  el.find('#table-head-customer-col-5').simulate('click');
  expect(store_2.dispatch).toBeCalledWith( {"payload": "zip", "type": "CHANGE_CUSTOMER_SORT"} );
});

it('handles a sort 6', () => {
  const el = mount(<CustomerList store={store_2} />);
  el.find('#table-head-customer-col-6').simulate('click');
  expect(store_2.dispatch).toBeCalledWith( {"payload": "area", "type": "CHANGE_CUSTOMER_SORT"} );
});

it('handles a sort 7', () => {
  const el = mount(<CustomerList store={store_2} />);
  el.find('#table-head-customer-col-7').simulate('click');
  expect(store_2.dispatch).toBeCalledWith( {"payload": "phone", "type": "CHANGE_CUSTOMER_SORT"} );
});

it('handles a sort 8', () => {
  const el = mount(<CustomerList store={store_2} />);
  el.find('#table-head-customer-col-8').simulate('click');
  expect(store_2.dispatch).toBeCalledWith( {"payload": "account_num", "type": "CHANGE_CUSTOMER_SORT"} );
});

it('handles a sort 9', () => {
  const el = mount(<CustomerList store={store_2} />);
  el.find('#table-head-customer-col-9').simulate('click');
  expect(store_2.dispatch).toBeCalledWith( {"payload": "sales_rep", "type": "CHANGE_CUSTOMER_SORT"} );
});