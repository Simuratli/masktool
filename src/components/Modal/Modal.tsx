import React from 'react'
import { useDispatch } from 'react-redux'
import { setToggleModal } from '../../redux/actions'
import { ModapPropTypes } from './modal.types'

function Modal({ children }: ModapPropTypes) {

  const dispatch = useDispatch()

  return (
    <div className='modal'>
      <div onClick={() => { dispatch(setToggleModal(false)) }} className="modal__backdrop"></div>
      <div className="modal__content">
        {children}
      </div>
    </div>
  )
}

export default React.memo(Modal)