import React, { useEffect, useState } from 'react';
import { SearchIcon } from './icons'

import { InputPropTypes } from './input.types';

function Input({ type, name, placeholder, className, disabled, max, onChange, value }: InputPropTypes) {

    return (
        <div>
            {className === 'search' &&
                <button disabled={disabled} className='input__button'>
                    <SearchIcon />
                </button>
            }
            <input value={value.slice(0, 8)} onChange={onChange} inputMode={type === "number" ? 'numeric' : "text"} disabled={disabled} className={`input ${className}`} placeholder={placeholder} type={type} name={name} />
        </div>
    )
}

export default React.memo(Input);