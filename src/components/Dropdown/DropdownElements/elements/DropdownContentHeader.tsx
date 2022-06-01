import React, { useCallback, useEffect } from 'react'
import { Box } from '../../../../containers'
import RadioButton from '../../../Radio'
import { choseActionForRecords } from '../../../../utils/DropdownChoseAction'
import MultipleSelect from '../../../MultipleSelect'
import { DropdownHeaderPropsTypes } from '../DropdownContent.types';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultTasks } from '../../../../redux/actions';
import { ReducerType } from '../../../../redux/reducers/reducer.types';


function DropdownContentHeader({ name, deleteOrMask, checked, setChecked, filter, selectData }: DropdownHeaderPropsTypes) {
    const dispatch = useDispatch();
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks)
    const modalState = useSelector((state: ReducerType) => state.modalReducer);

    const handleSelectFilter = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {

            let actionValue = choseActionForRecords(e.target.name)

            if (e.target.name === "delete") {
                defaultTasksState.map((task) => {
                    if (task.entityName === name) {
                        task.maskOperation = false
                        task.text = "Delete"
                        if (actionValue.records) {
                            task.filter = []
                        }
                    }
                })

            }
            else if (e.target.name === "masking") {
                defaultTasksState.map((task) => {
                    if (task.entityName === name) {
                        task.maskOperation = true
                        task.text = `All Records ${task.fields.length} fields are masked`
                        if (actionValue.records) {
                            task.filter = []
                        }
                    }
                })

            }
            else if (e.target.name === "all") {
                defaultTasksState.map((task) => {
                    if (task.entityName === name) {
                        task.maskOperation = true
                        task.text = `All Records ${task.fields.length} fields are masked`
                        if (actionValue.records) {
                            task.filter = []
                        }
                    }
                })

            }

            else if (e.target.name === "special") {
                defaultTasksState.map((task) => {
                    if (task.entityName === name) {
                        task.maskOperation = true
                        task.text = `Nothing selected`
                        if (actionValue.records) {
                            task.filter = []
                        }
                    }
                })

            }

            dispatch(setDefaultTasks(defaultTasksState))
            setChecked(actionValue)


        },
        [defaultTasksState, name],

    )

    useEffect(() => {
        defaultTasksState.map((task) => {
            if (task.entityName === name) {
                if (task.filter && task.filter.length !== 0) {
                    setChecked({
                        records: false,
                    })
                }
            }
        })
    }, [modalState.delete])




    const chose = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.checked) {
                defaultTasksState.map((task) => {
                    if (task.entityName === name) {
                        task.filter = [...task.filter, e.target.value]
                        task.text = `View - ${task.filter.join(', ')}`
                    }
                })


                setChecked(choseActionForRecords('special'))
            } else {
                defaultTasksState.map((task) => {
                    if (task.entityName === name) {
                        task.filter = task.filter.filter((word: string) => word !== e.target.value)
                        task.text = task.filter.length === 0 ? `Nothing selected` : `View - ${task.filter.join(', ')}`
                    }
                })

            }

            dispatch(setDefaultTasks(defaultTasksState))
        },
        [filter, defaultTasksState],
    )


    const deleteFunc = useCallback(
        (item: string) => {
            defaultTasksState.map((task) => {
                if (task.entityName === name) {
                    task.filter = filter.filter((word: string) => word !== item)
                    task.text = task.filter.length === 0 ? `Nothing selected` : `View - ${task.filter.join(', ')}`
                }
            })
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
                            <MultipleSelect placeholder='Select view to edit' data={selectData} deleteFunc={deleteFunc} values={filter && filter} chose={chose} />
                        </div>
                    </div>
                    {
                        filter && filter.length === 0 ? <div className="dropdown__box__container__actions">
                            <RadioButton name="delete" color="green" checked={typeof deleteOrMask === 'boolean' && !deleteOrMask} onChange={handleSelectFilter} label={"Delete"} />
                            <RadioButton name="masking" color="green" checked={typeof deleteOrMask === 'boolean' && deleteOrMask} onChange={handleSelectFilter} label={"Maksing"} />
                        </div> :
                            <div className=""></div>
                    }
                </div>
            </Box>
        </div>
    )
}

export default React.memo(DropdownContentHeader)