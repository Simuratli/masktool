import { ButtonPropTypes } from './button.types';
import React from 'react';

function Button({ text, disabled, onClick, type, size }: ButtonPropTypes) {
    return (
        <button disabled={disabled} onClick={onClick} className={`button ${type} ${size}`}>
            {text}
        </button>
    )
}

export default React.memo(Button);