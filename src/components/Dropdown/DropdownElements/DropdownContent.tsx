/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { DropdownContentPorpTypes } from '../Dropdown.types'
import DropdownContentHeader from './elements/DropdownContentHeader'
import { DropdownCheckedTypes } from './DropdownContent.types';
import Table from '../../Table';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../redux/reducers/reducer.types'
import MultitableContainer from './MultitableContainer';
import { EntityByViewMainType, EntityByViewType, EntityByViewCellsType } from '../../../redux/reducers/backend-reducers/entity-by-view/entity-by-view.types'

function DropdownContent({ fields, name, deleteOrMask }: DropdownContentPorpTypes) {
    const [filter, setfilter] = useState<string[]>([])
    const [dropdownData, setDropdownData] = useState<string[]>([])
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer)

    const [checked, setChecked] = useState<DropdownCheckedTypes>({
        records: true,
    })

    useEffect(() => {

        viewsByEntityState.entities.map((view: EntityByViewMainType) => {
            if (view.name === name) {
                view.data.map((data: EntityByViewType) => {
                    setDropdownData((prev) => ([...prev, data.name]))
                })
            }
        })
    }, [viewsByEntityState, name, deleteOrMask])



    return (
        <div className="dropdown__content">
            <DropdownContentHeader selectData={dropdownData} name={name} deleteOrMask={deleteOrMask} filter={filter} setfilter={setfilter} checked={checked} setChecked={setChecked} />

            <div className={`dropdown__content__table show`}>
                {
                    checked.records ? <Table fields={fields} /> :
                        (filter.length === 0 ? <div className='table__nodata'>PLEASE SELECT VIEW</div> : viewsByEntityState.entities.map((view) => view.name === name && view.data.map((item) => filter.includes(item.name) && <MultitableContainer mainName={name} deleteOrMask={item.delete} fields={item.cells} name={item.name} />)))
                }
            </div>
        </div>
    )
}

export default React.memo(DropdownContent)