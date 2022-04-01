import React from 'react'
import { InputPropTypes } from './input.types'

function Input({ type, name, placeholder, stil, disabled }: InputPropTypes) {
    return (
        <input disabled={disabled} className={`input ${stil}`} placeholder={placeholder} type={type} name={name} />
    )
}

export default Input