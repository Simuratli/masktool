import React from 'react';
import { useDispatch } from 'react-redux';
import { setToggleModal, setModalToggleActions, setModalAddEntity, setModalAddField, setModalDeleted, setModaleActionsAllow } from '../../redux/actions';
import { ModapPropTypes } from './modal.types';
import { CloseIcon } from './icons';

function Modal({ children }: ModapPropTypes) {

  const close = () => {
    dispatch(setToggleModal(false))
    dispatch(setModalToggleActions(false))
    dispatch(setModalAddEntity(false))
    dispatch(setModalAddField(false))
    dispatch(setModalDeleted(false))
    dispatch(setModaleActionsAllow(false))
  }

  const dispatch = useDispatch()
  return (
    <div className='modal'>
      <div onClick={close} className="modal__backdrop"></div>
      <div className="modal__content">
        <div className="modal__close">
          <CloseIcon onClick={close} />
        </div>
        <div className='modal__info__icon'>
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="70" height="70" rx="4" fill="#F9FAFF" />
            <path d="M34 19C42.2843 19 49 25.7157 49 34C49 42.2843 42.2843 49 34 49C25.7157 49 19 42.2843 19 34C19 25.7157 25.7157 19 34 19ZM34 21.25C26.9584 21.25 21.25 26.9584 21.25 34C21.25 41.0416 26.9584 46.75 34 46.75C41.0416 46.75 46.75 41.0416 46.75 34C46.75 26.9584 41.0416 21.25 34 21.25Z" fill="#1E2432" />
            <path d="M35.875 28C35.875 28.8284 35.2034 29.5 34.375 29.5C33.5466 29.5 32.875 28.8284 32.875 28C32.875 27.1716 33.5466 26.5 34.375 26.5C35.2034 26.5 35.875 27.1716 35.875 28Z" fill="#1E2432" />
            <path d="M33.25 32.125V39.625C33.25 40.2463 33.7537 40.75 34.375 40.75C34.9963 40.75 35.5 40.2463 35.5 39.625V32.125C35.5 31.5037 34.9963 31 34.375 31C33.7537 31 33.25 31.5037 33.25 32.125Z" fill="#1E2432" />
          </svg>
        </div>
        {children}
      </div>
    </div>
  )
}

export default React.memo(Modal)