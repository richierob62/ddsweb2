import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const el = shallow(<App />);
  expect(el).toBeTruthy();
});

