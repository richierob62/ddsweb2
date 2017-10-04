import React from 'react'
import { connect } from 'react-redux'
import ValidationModal from './ValidationModal'
import SuccessModal from './SuccessModal'
import LoginModal from './LoginModal'

import { getModalType } from '../selectors'

const mstp = state => {
  return {
    type: getModalType(state)
  }
}

const modal = props => {
  const { type } = props

  switch (type) {
    case 'validation':
      return <ValidationModal {...props} />

    case 'success':
      return <SuccessModal {...props} />

    case 'login':
      return <LoginModal />

    default:
      return null
  }
}

export default connect(mstp)(modal)
