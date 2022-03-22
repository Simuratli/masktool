import { ButtonPropTypes } from './button.types'
import React from 'react'

function Button({ text, disabled, onClick }: ButtonPropTypes) {
    return (
        <button disabled={disabled} onClick={onClick} className="button">
            {text}
        </button>
    )
}

export default React.memo(Button)