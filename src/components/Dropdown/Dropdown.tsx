import React from 'react'
import { DropdownPropTypes } from './dropdown.types'

function Dropdown({ children, open }: DropdownPropTypes) {

 

    return (
        <div className={`dropdown ${open && 'open'}`}>
            {children}
        </div>
    )
}

export default React.memo(Dropdown)