import React from 'react';
import Details from './Details';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

it('renders without crashing', () => {
  const el = shallow(<Details />);
  expect(shallowToJson(el)).toMatchSnapshot();
});
