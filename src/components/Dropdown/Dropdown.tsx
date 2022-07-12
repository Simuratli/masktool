import React, { useState } from 'react';
import { DropdownHeader, DropdownContent } from './DropdownElements';
import { DropdownPorpTypes } from './Dropdown.types';

function Dropdown({ actions, name, deleteOrMask, success, fields, etc, records, progress, requestResult, filter, totalRecords, successRecords, errorText, logicalName, open }: DropdownPorpTypes) {
    const [toggle, setToggle] = useState(false);

    return (
        <div className={`dropdown ${open && "openedDropdown"}`}>
            <DropdownHeader filter={filter} logicalName={logicalName} errorText={errorText} successRecords={successRecords} totalRecords={totalRecords} progress={progress} requestResult={requestResult} deleteOrMask={deleteOrMask} etc={etc} success={success} name={name} actions={actions} setToggle={setToggle} />
            <DropdownContent logicalName={logicalName} records={records} errorText={errorText} filter={filter} etc={etc!} deleteOrMask={deleteOrMask} name={name} fields={fields} />
        </div>
    )
}

export default Dropdown