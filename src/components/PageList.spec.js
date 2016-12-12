import React from 'react';
import PageList from './PageList';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

it('renders without crashing', () => {
  const el = shallow(<PageList />);
  expect(shallowToJson(el)).toMatchSnapshot();
});

