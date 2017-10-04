import React, { Component } from 'react'

const asyncLoader = importComponent => {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props)

      this.noLongerMounted = false

      this.state = {
        component: null
      }
    }

    async componentDidMount() {
      const { default: component } = await importComponent()
      if (!this.noLongerMounted)
        this.setState({
          component: component
        })
    }

    componentWillUnmount() {
      this.noLongerMounted = true
    }

    render() {
      const C = this.state.component

      return C ? <C {...this.props} /> : null
    }
  }

  return AsyncComponent
}

export default asyncLoader
