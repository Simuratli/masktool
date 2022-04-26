import React, { useState } from 'react';
import { DropdownHeader, DropdownContent } from './DropdownElements';
import { DropdownPorpTypes } from './Dropdown.types';

function Dropdown({ actions, name, deleteOrMask, success, fields, etc }: DropdownPorpTypes) {
    const [toggle, setToggle] = useState(false);

    return (
        <div className={`dropdown ${toggle && "openedDropdown"}`}>
            <DropdownHeader deleteOrMask={deleteOrMask} etc={etc} success={success} name={name} actions={actions} setToggle={setToggle} />
            <DropdownContent deleteOrMask={deleteOrMask} name={name} fields={fields} />
        </div>
    )
}

export default React.memo(Dropdown)