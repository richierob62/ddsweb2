import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Modal from './components/Modal'
import App from './App'

const Root = props => {
  const { store } = props

  return (
    <Provider store={store}>
      <div>
        <Modal store={store} />
        <BrowserRouter>
          <App {...props} />
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default Root
