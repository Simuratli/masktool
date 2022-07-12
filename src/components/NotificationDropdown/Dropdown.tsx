import React from 'react'
import { DropdownPropTypes } from './dropdown.types'

function Dropdown({ children, open }: DropdownPropTypes) {

 

    return (
        <div className={`notificationdropdown ${open && 'open'}`}>
            {children}
        </div>
    )
}

export default Dropdown