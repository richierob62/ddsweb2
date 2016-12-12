import React from 'react';
import Login from './Login';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

it('renders without crashing', () => {
  const el = shallow(<Login />);
  expect(shallowToJson(el)).toMatchSnapshot();
});
