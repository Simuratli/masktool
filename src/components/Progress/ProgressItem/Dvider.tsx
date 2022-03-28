import React from 'react'

function Dvider() {
    return (
        <div className="progress__svg">
            <svg width="17" height="70" viewBox="0 0 17 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.66699 0H0.666992L11.0074 32.9012C11.4368 34.2675 11.4368 35.7325 11.0074 37.0988L0.666992 70H5.66699L16.0074 37.0988C16.4368 35.7325 16.4368 34.2675 16.0074 32.9012L5.66699 0Z" fill="#EBECEE" />
            </svg>
        </div>
    )
}

export default React.memo(Dvider)