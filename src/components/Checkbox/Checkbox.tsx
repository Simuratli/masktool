import React from 'react'
import { CheckboxPropTypes } from './checkbox.types'

function Checkbox({ text, onChange,checked }: CheckboxPropTypes) {

   
    return (
        <label className="b-contain">
            <span>{text}</span>
            <input checked={checked} onChange={onChange} type="checkbox" />
            <div className="b-input"></div>
        </label>
    )
}

export default React.memo(Checkbox)