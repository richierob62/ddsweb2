import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const el = shallow(<Header />);
  expect(el).toBeTruthy();
});

