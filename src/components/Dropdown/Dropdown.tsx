import React, { useState, useEffect, useRef } from 'react';
import { DropdownHeader, DropdownContent } from './DropdownElements';

function Dropdown({ actions, name, table }: any) {
    const ref = useRef<HTMLDivElement>(null);
    const [toggle, setToggle] = useState(false);

    // useEffect(() => {
    //     const checkIfClickedOutside = (e: any) => {
    //         if (toggle && ref.current && !ref.current.contains(e.target)) {
    //             setToggle(false);
    //         }
    //     }
    //     document.addEventListener("mousedown", checkIfClickedOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", checkIfClickedOutside);
    //     }
    // }, [toggle])


    return (
        <div ref={ref} className={`dropdown ${toggle && "openedDropdown"}`}>
            <DropdownHeader name={name} actions={actions} setToggle={setToggle} />
            <DropdownContent table={table} />
        </div>
    )
}

export default React.memo(Dropdown)