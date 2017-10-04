import buildPage from '../page_utils/page_builder'
import { Component } from 'react'

class pageToRender extends Component {
  componentWillMount() {
    const { dispatch, action } = this.props
    dispatch(action)
  }

  render() {
    return buildPage('pay_plans')
  }
}

export default pageToRender
