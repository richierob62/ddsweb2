import React from 'react';
import ContextMenu from './ContextMenu';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

it('renders without crashing', () => {
  const el = shallow(<ContextMenu />);
  expect(shallowToJson(el)).toMatchSnapshot();
});

