import React, { useCallback } from 'react'
import { Box } from '../../../../containers'
import RadioButton from '../../../Radio'
import { choseActionForRecords, choseDeleteOrMask } from '../../../../utils/DropdownChoseAction'
import MultipleSelect from '../../../MultipleSelect'
import { DropdownHeaderPropsTypes } from '../DropdownContent.types';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../../../redux/reducers/reducer.types';
import { setDefaultTasks } from '../../../../redux/actions'


function DropdownContentHeader({ name, deleteOrMask, checked, setChecked, filter, setfilter, selectData }: DropdownHeaderPropsTypes) {
    const dispatch = useDispatch();
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks);

    const handleSelectFilter = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            let actionValue = choseActionForRecords(e.target.name)
            setChecked(actionValue)
            actionValue.records && setfilter([])
            let newTasks = await choseDeleteOrMask(defaultTasksState, name, e.target.name)
            dispatch(setDefaultTasks(newTasks))

        },
        [],
    )



    const chose = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.checked) {
                setfilter((prev) => ([...prev, e.target.value]))
                setChecked(choseActionForRecords('special'))
            } else {
                setfilter(filter.filter((word: string) => word !== e.target.value))
            }
        },
        [filter],
    )


    const deleteFunc = useCallback(
        (item: string) => {
            setfilter(filter.filter((word: string) => word !== item))
        },
        [filter],
    )


    return (
        <div className="dropdown__content__head">
            <Box type='small'>
                <div className="dropdown__box__container">
                    <div className="dropdown__box__container__main">
                        <RadioButton name="all" color="blue" checked={checked.records} onChange={handleSelectFilter} label={"All records"} />
                        <div className="dropdown__box__container__main__filter">
                            <RadioButton name="special" color="blue" checked={!checked.records} onChange={handleSelectFilter} />
                            <MultipleSelect placeholder='Select view to edit' data={selectData} deleteFunc={deleteFunc} values={filter} chose={chose} />
                        </div>
                    </div>
                    {
                        filter.length === 0 ? <div className="dropdown__box__container__actions">
                            <RadioButton name="delete" color="green" checked={typeof deleteOrMask === 'boolean' && deleteOrMask} onChange={handleSelectFilter} label={"Delete"} />
                            <RadioButton name="masking" color="green" checked={!deleteOrMask} onChange={handleSelectFilter} label={"Maksing"} />
                        </div> :
                            <div className="dropdown__box__container__actions"></div>
                    }
                </div>
            </Box>
        </div>
    )
}

export default React.memo(DropdownContentHeader)