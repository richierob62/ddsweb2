import React from 'react';
import Page from './Page';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';


it('renders without crashing', () => {
  const el = shallow(<Page />);
  expect(shallowToJson(el)).toMatchSnapshot();
});
