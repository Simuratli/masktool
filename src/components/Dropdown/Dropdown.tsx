import React, { useState } from 'react';
import { DropdownHeader, DropdownContent } from './DropdownElements';
import { DropdownPorpTypes } from './Dropdown.types';

function Dropdown({ actions, name, success, fields }: DropdownPorpTypes) {
    const [toggle, setToggle] = useState(false);

    return (
        <div className={`dropdown ${toggle && "openedDropdown"}`}>
            <DropdownHeader success={success} name={name} actions={actions} setToggle={setToggle} />
            <DropdownContent fields={fields}  />
        </div>
    )
}

export default React.memo(Dropdown)