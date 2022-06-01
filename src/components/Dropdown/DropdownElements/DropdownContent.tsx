/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { DropdownContentPorpTypes } from '../Dropdown.types'
import DropdownContentHeader from './elements/DropdownContentHeader'
import { DropdownCheckedTypes } from './DropdownContent.types';
import Table from '../../Table';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../redux/reducers/reducer.types'
import MultitableContainer from './MultitableContainer';
import { EntityByViewMainType, EntityByViewType } from '../../../redux/reducers/backend-reducers/entity-by-view/entity-by-view.types'


function DropdownContent({ fields, name, deleteOrMask, etc, filter }: DropdownContentPorpTypes) {
    // const [filter, setfilter] = useState<string[]>([])
    const [dropdownData, setDropdownData] = useState<string[]>([])
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer)
    const modalState = useSelector((state: ReducerType) => state.modalReducer)
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks)







    const [checked, setChecked] = useState<DropdownCheckedTypes>({
        records: true,
    })

    useEffect(() => {
        let dropdownDataArray: string[] = []
        viewsByEntityState.entities.map((view: EntityByViewMainType) => {
            if (view.name === name) {
                view.data.map((data: EntityByViewType) => {
                    dropdownDataArray.push(data.name)
                    setDropdownData(dropdownDataArray)
                })
            }
        })
    }, [viewsByEntityState.entities])



    return (
        <div className="dropdown__content">
            <DropdownContentHeader selectData={dropdownData} name={name} deleteOrMask={deleteOrMask} filter={filter ? filter : []} checked={checked} setChecked={setChecked} />

            <div className={`dropdown__content__table show`}>
                {
                    checked.records ? <Table etc={etc} name={name} searchName="entities" fields={fields} /> :
                        (filter && filter.length === 0 ? <div className='table__nodata'>PLEASE SELECT VIEW</div> : viewsByEntityState.entities.map((view) => view.name === name && view.data.map((item) => filter && filter.includes(item.name) && <MultitableContainer etc={etc} searchName="views" mainName={name} deleteOrMask={item.maskOperation} fields={item.cells} name={item.name} />)))
                }
            </div>
        </div>
    )
}

export default DropdownContent