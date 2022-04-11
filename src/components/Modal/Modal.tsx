import React from 'react'

function Modal({children}:any) {
  return (
    <div className='modal'>
        <div className="modal__backdrop"></div>
        <div className="modal__content">
            {children}
        </div>
    </div>
  )
}

export default React.memo(Modal)