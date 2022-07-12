import React from 'react'
import CheckedIcon from './icons/Checked'
import { RadioPropTypes } from './Radio.types'

function Radio({ checked, onChange, label, color, name, className }: RadioPropTypes) {

    return (
        <div className={`radio__container ${className}`}>
            <div className="radio">
                <input id={name} name={name} onChange={onChange}  type="radio" checked={checked} />
                <CheckedIcon checked={checked} color={color === "blue" ? "#1A4F95" : "#80BB5B"} />
                <label htmlFor={name} className="radio__text">{label}</label>
            </div>
        </div>
    )

}




export default React.memo(Radio)