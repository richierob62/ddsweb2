import React from 'react';
import Header from './Header';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

it('renders without crashing', () => {
  const el = shallow(<Header />);
  expect(shallowToJson(el)).toMatchSnapshot();
});

