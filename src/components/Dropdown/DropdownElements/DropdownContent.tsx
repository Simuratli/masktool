/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { DropdownContentPorpTypes } from '../Dropdown.types'
import DropdownContentHeader from './elements/DropdownContentHeader'
import { DropdownCheckedTypes } from './DropdownContent.types';
import Table from '../../Table';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../redux/reducers/reducer.types'
import MultitableContainer from './MultitableContainer';
import { dropdownArrayUtil } from './DROPDOWN__UTILS'
import { NoDataIcon } from './icons'

function DropdownContent({ fields, name, deleteOrMask, records, etc, filter, errorText, logicalName }: DropdownContentPorpTypes) {
    const [dropdownData, setDropdownData] = useState<string[]>([])
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer)

    const [checked, setChecked] = useState<DropdownCheckedTypes>({
        records: true,
    })


    useEffect(() => {
        let dropdownDataArray = dropdownArrayUtil(viewsByEntityState, logicalName ? logicalName : name)
        
        setDropdownData(dropdownDataArray)
    }, [name, viewsByEntityState.entities])

    return (
        <div className="dropdown__content">
            <DropdownContentHeader logicalName={logicalName} selectData={dropdownData} records={records === undefined ? true : records} name={name} deleteOrMask={deleteOrMask} filter={filter ? filter : []} checked={checked} setChecked={setChecked} />

            <div className={`dropdown__content__table show`}>
                {
                    (records === undefined ? true : records) ? (deleteOrMask ? <Table logicalName={logicalName} etc={etc} name={name} searchName="entities" fields={fields} /> : <></>) :
                        (filter && filter.length === 0 ? <div className='table__nodata'>
                            <NoDataIcon />
                        </div> : viewsByEntityState.entities.filter((v, i, a) => a.findIndex(v2 => (v2.name === v.name)) === i).map((view) => view.name === (logicalName ? logicalName : name) && view.data.filter((v, i, a) => a.findIndex(v2 => (v2.name === v.name)) === i).map((item) => filter && filter.includes(item.name) && <MultitableContainer id={item.viewId} filter={filter} logicalName={logicalName} errorText={errorText} etc={etc} searchName="views" mainName={name} deleteOrMask={item.maskOperation} fields={item.cells} name={item.name} />)))
                }

            </div>
        </div>
    )
}

export default DropdownContent