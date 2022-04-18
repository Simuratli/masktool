import React from 'react'
import CheckedIcon from './icons/Checked'
import { RadioPropTypes } from './Radio.types'

function Radio({ checked, onChange, label, color, name }: RadioPropTypes) {

    return (
        <div className="radio__container">
            <div className="radio">
                <input name={name} onChange={onChange} id="radio-1" type="radio" checked={checked} />
                <CheckedIcon checked={checked} color={color === "blue" ? "#1A4F95" : "#80BB5B"} />
                <span className="radio__text">{label}</span>
            </div>
        </div>
    )

}




export default React.memo(Radio)