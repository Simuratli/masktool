import { ButtonPropTypes } from './button.types';
import React from 'react';
import ButtonLoading from './ButtonLoading'

function Button({ text, disabled, onClick, type, size, addLoading }: ButtonPropTypes) {
    return (
        <button disabled={disabled} onClick={onClick} className={`button ${type} ${size}`}>
            {
                addLoading ? <ButtonLoading /> : text
            }
        </button>
    )
}

export default React.memo(Button);