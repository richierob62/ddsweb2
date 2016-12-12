import React from 'react';
import Menu from './Menu';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

it('renders without crashing', () => {
  const el = shallow(<Menu />);
  expect(shallowToJson(el)).toMatchSnapshot();
});

