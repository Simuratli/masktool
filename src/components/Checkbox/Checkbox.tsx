import React from 'react'
import { CheckboxPropTypes } from './checkbox.types'

function Checkbox({ text, onChange, checked, value, disabled }: CheckboxPropTypes) {


    return (
        <label className={`b-contain ${disabled && 'disable'}`}>
            <span>{text}</span>
            <input value={value} disabled={disabled} checked={checked} onChange={onChange} type="checkbox" />
            <div className="b-input"></div>
        </label>
    )
}

export default React.memo(Checkbox)