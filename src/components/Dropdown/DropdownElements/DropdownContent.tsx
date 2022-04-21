import React, { useState } from 'react'
import { DropdownContentPorpTypes } from '../Dropdown.types'
import DropdownContentHeader from './elements/DropdownContentHeader'
import { DropdownCheckedTypes } from './DropdownContent.types';
import Table from '../../Table';
import MultitableContainer from './MultitableContainer';

function DropdownContent({ fields }: DropdownContentPorpTypes) {
    const [filter, setfilter] = useState<string[]>([])

    const [checked, setChecked] = useState<DropdownCheckedTypes>({
        records: true,
        delete: true,
    })

    return (
        <div className="dropdown__content">
            <DropdownContentHeader filter={filter} setfilter={setfilter} checked={checked} setChecked={setChecked} />

            <div className={`dropdown__content__table show`}>
                {
                    checked.records ? <Table fields={fields} /> :
                        (filter.length === 0 ?  <div className='table__nodata'>PLEASE SELECT VIEW</div> : filter.map((item) => (<MultitableContainer name={item} />)))
                }
            </div>
        </div>
    )
}

export default React.memo(DropdownContent)