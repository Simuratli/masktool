import React, { useState } from 'react'
import { DropdownContentPorpTypes } from '../Dropdown.types'
import DropdownContentHeader from './elements/DropdownContentHeader'
import { DropdownCheckedTypes } from './DropdownContent.types'


function DropdownContent({ table }: DropdownContentPorpTypes) {

    const [checked, setChecked] = useState<DropdownCheckedTypes>({
        records: true,
        delete: true
    })




    return (
        <div className="dropdown__content">
            <DropdownContentHeader checked={checked} setChecked={setChecked} />

            <div className={`dropdown__content__table ${!checked.delete && "show"}`}>
                {table}
            </div>
        </div>
    )
}

export default React.memo(DropdownContent)