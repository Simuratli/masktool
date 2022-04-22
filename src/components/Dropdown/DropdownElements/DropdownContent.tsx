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

function DropdownContent({ fields, name }: DropdownContentPorpTypes) {
    const [filter, setfilter] = useState<string[]>([])
    const [dropdownData, setDropdownData] = useState<string[]>([])
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer.entities)
    const [SpecialTableData, setSpecialTableData] = useState<EntityByViewCellsType[] | never[]>([])

    const [checked, setChecked] = useState<DropdownCheckedTypes>({
        records: true,
        delete: true,
    })

    useEffect(() => {
        console.log('viewsByEntityState', viewsByEntityState)

        viewsByEntityState.map((view: EntityByViewMainType) => {
            if (view.name === name) {
                view.data.map((data: EntityByViewType) => {
                    setDropdownData((prev) => ([...prev, data.name]))
                    setSpecialTableData(data.cells)
                })
            }
        })

    }, [viewsByEntityState, name])


    return (
        <div className="dropdown__content">
            <DropdownContentHeader selectData={dropdownData} name={name} filter={filter} setfilter={setfilter} checked={checked} setChecked={setChecked} />

            <div className={`dropdown__content__table show`}>
                {
                    checked.records ? <Table fields={fields} /> :
                        (filter.length === 0 ? <div className='table__nodata'>PLEASE SELECT VIEW</div> : filter.map((item) => (<MultitableContainer fields={SpecialTableData} name={item} />)))
                }
            </div>
        </div>
    )
}

export default React.memo(DropdownContent)