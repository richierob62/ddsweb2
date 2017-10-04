import React from 'react'
import Menu from './Menu'
import { shallowToJson } from 'enzyme-to-json'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  const el = shallow(<Menu />)
  expect(shallowToJson(el)).toMatchSnapshot()
})
