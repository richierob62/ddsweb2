import React from 'react';
import Customers from './Customers';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

it('renders without crashing', () => {
  const el = shallow(<Customers />);
  expect(shallowToJson(el)).toMatchSnapshot();
});

