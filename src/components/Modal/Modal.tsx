import React from 'react';
import { useDispatch } from 'react-redux';
import { setToggleModal } from '../../redux/actions';
import { ModapPropTypes } from './modal.types';
import { ModalFooterButtons } from './elements';
import { CloseIcon } from './icons';

function Modal({ children }: ModapPropTypes) {

  const dispatch = useDispatch()
  return (
    <div className='modal'>
      <div onClick={() => { dispatch(setToggleModal(false)) }} className="modal__backdrop"></div>
      <div className="modal__content">
        <div className="modal__close">
          <CloseIcon onClick={() => { dispatch(setToggleModal(false)) }} />
        </div>
        {children}
        <ModalFooterButtons />
      </div>
    </div>
  )
}

export default React.memo(Modal)