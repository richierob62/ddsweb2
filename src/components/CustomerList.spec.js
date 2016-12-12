import React from 'react';
import CustomerList from './CustomerList';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import configureStore from '../configureStore';

const store = configureStore();

it('renders without crashing', () => {
  const el = shallow(<CustomerList store={store}/>);
  expect(shallowToJson(el)).toMatchSnapshot();
});

