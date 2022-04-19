import React, { useState } from 'react';
import { DropdownHeader, DropdownContent } from './DropdownElements';
import { DropdownPorpTypes } from './Dropdown.types'

function Dropdown({ actions, name, table }: DropdownPorpTypes) {
    const [toggle, setToggle] = useState(false);

    return (
        <div className={`dropdown ${toggle && "openedDropdown"}`}>
            <DropdownHeader name={name} actions={actions} setToggle={setToggle} />
            <DropdownContent table={table} />
        </div>
    )
}

export default React.memo(Dropdown)