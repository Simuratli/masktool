import React from 'react'
import { useDispatch } from 'react-redux'
import { setToggleModal } from '../../redux/actions'
function Modal({ children }: any) {

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