import React, { useState } from 'react';
import { DropdownHeader, DropdownContent } from './DropdownElements';
import { DropdownPorpTypes } from './Dropdown.types';

function Dropdown({ actions, name, deleteOrMask, success, fields, etc, progress, requestResult, filter, totalRecords, successRecords }: DropdownPorpTypes) {
    const [toggle, setToggle] = useState(false);
   

    return (
        <div className={`dropdown ${toggle && "openedDropdown"}`}>
            <DropdownHeader successRecords={successRecords}  totalRecords={totalRecords} progress={progress} requestResult={requestResult} deleteOrMask={deleteOrMask} etc={etc} success={success} name={name} actions={actions} setToggle={setToggle} />
            <DropdownContent filter={filter} etc={etc!} deleteOrMask={deleteOrMask} name={name} fields={fields} />
        </div>
    )
}

export default Dropdown