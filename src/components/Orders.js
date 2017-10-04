import buildPage from '../page_utils/page_builder'
import { Component } from 'react'

class pageToRender extends Component {
  componentWillMount() {
    const { dispatch, action } = this.props
    dispatch(action)
  }

  render() {
    return buildPage('orders')
  }
}

export default pageToRender
