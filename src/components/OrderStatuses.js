import buildPage from '../page_utils/page_builder'
import { Component } from 'react'

class pageToRender extends Component {
	componentWillMount() {
		const { dispatch, action } = this.props
		dispatch(action)
	}

	render() {
		return buildPage('order_statuses')
	}
}

export default pageToRender
