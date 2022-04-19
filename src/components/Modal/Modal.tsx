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
        <div className="modal__close">
          <svg onClick={() => { dispatch(setToggleModal(false)) }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.66857 8L16 14.3314V16H14.3314L8 9.66857L1.66857 16H0V14.3314L6.33143 8L0 1.66857V0H1.66857L8 6.33143L14.3314 0H16V1.66857L9.66857 8Z" fill="#696D8C" />
          </svg>
        </div>
        {children}
      </div>
    </div>
  )
}

export default React.memo(Modal)