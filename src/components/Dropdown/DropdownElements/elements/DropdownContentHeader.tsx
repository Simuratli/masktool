import React, { useCallback, useEffect } from 'react'
import { Box } from '../../../../containers'
import RadioButton from '../../../Radio'
import { choseActionForRecords } from '../../../../utils/DropdownChoseAction'
import MultipleSelect from '../../../MultipleSelect'
import { DropdownHeaderPropsTypes } from '../DropdownContent.types';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultTasks, prepareEntitiesForDelete, setAllViewsByEntity, prepareEntitiesForDeleteItemsPutThemAll } from '../../../../redux/actions';
import { ReducerType } from '../../../../redux/reducers/reducer.types';
import { prepareCells } from '../../../../utils/run.utils';
import { addDeleteOrMaskViaHeader } from '../../../../utils/ViewsByEntityUtils'

function DropdownContentHeader({ name, deleteOrMask, records, checked, setChecked, filter, selectData, logicalName }: DropdownHeaderPropsTypes) {
    const dispatch = useDispatch();
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks)
    const modalState = useSelector((state: ReducerType) => state.modalReducer);
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer)
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites);

    const handleSelectFilter = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            let actionValue = await choseActionForRecords(e.target.name)

            let newViewByEntityState = addDeleteOrMaskViaHeader(viewsByEntityState.entities, logicalName ? logicalName : name, true)
            dispatch(setAllViewsByEntity(newViewByEntityState))


            if (e.target.name === "delete") {
                defaultTasksState.map((task) => {
                    if (task.entityName === (name)) {
                        task.maskOperation = false
                        task.text = "Delete"
                        // if (records) {
                        //     task.text = "Delete"
                        // } else {
                        //     task.text = task.filter && task.filter.length === 0 ? `Nothing selected` : `View - ${task.filter.join(', ')}`
                        // }
                        if (actionValue.records) {
                            task.filter = []
                        }
                    }
                })

                let newViewByEntityState = addDeleteOrMaskViaHeader(viewsByEntityState.entities, logicalName ? logicalName : name, false)
                dispatch(setAllViewsByEntity(newViewByEntityState))

            }


            else if (e.target.name === "masking") {
                defaultTasksState.map((task) => {
                    if (task.entityName === name) {
                        task.maskOperation = true
                        if (!records) {
                            task.text = task.filter && task.filter.length === 0 ? `Nothing selected` : `View - ${task.filter.join(', ')}`
                        } else {
                            task.text = `All Records ${task.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields are masked`
                        }

                        if (actionValue.records) {
                            task.filter = []
                        }
                    }
                })
                let newViewByEntityState = addDeleteOrMaskViaHeader(viewsByEntityState.entities, logicalName ? logicalName : name, true)
                dispatch(setAllViewsByEntity(newViewByEntityState))

            }



            else if (e.target.name === "all") {
                defaultTasksState.map((task) => {
                    if (task.entityName === (name)) {
                        // task.maskOperation = true
                        task.records = true
                        if (task.maskOperation) {
                            task.text = `All Records ${task.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields are masked`
                        } else {
                            task.text = "Delete"
                        }
                        if (actionValue.records) {
                            task.filter = []
                        }
                    }
                })

            }

            else if (e.target.name === "special") {
                defaultTasksState.map((task) => {
                    if (task.entityName === (name)) {
                        // task.maskOperation = true
                        task.records = false
                        if (task.maskOperation) {
                            task.text = `Nothing selected`
                        } else {
                            // task.text = "Delete"
                        }
                        if (actionValue.records) {

                        }
                    }
                })

            }

            dispatch(setDefaultTasks(defaultTasksState))
            setChecked(actionValue)


        },
        [defaultTasksState, dispatch, logicalName, name, records, setChecked, viewsByEntityState.entities],

    )

    // useEffect(() => {
    //     defaultTasksState.map((task) => {
    //         if (task.entityName === name) {
    //             if (task.filter && task.filter.length !== 0) {
    //                 setChecked({
    //                     records: false,
    //                 })
    //             }
    //         }
    //     })
    // }, [modalState.delete])


    const chose = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {

            for (const view of viewsByEntityState.entities) {
                if (view.name === (logicalName ? logicalName : name)) {

                    for (const item of view.data) {

                        if (item.name === e.target.value) {
                            if (item.maskOperation) {
                                prepareCells(item.cells).then((newCells) => {

                                    dispatch(prepareEntitiesForDelete({
                                        entityName: logicalName ? logicalName : name,
                                        maskOperation: item.maskOperation,
                                        filterViewId: item.viewId,
                                        fields: newCells
                                    }))

                                })

                            } else {
                                dispatch(prepareEntitiesForDelete({
                                    entityName: logicalName ? logicalName : name,
                                    maskOperation: item.maskOperation,
                                    filterViewId: item.viewId,
                                }))
                            }

                        }
                    }

                }
            }



            defaultTasksState.map((task) => {
               
                if (task.entityName.toLowerCase() === name.toLowerCase()) {
                    task.records = false
                    task.filter = task.filter ? [...task.filter, e.target.value] : [e.target.value]
                    if (task.maskOperation) {
                        
                        task.text = `View - ${task.filter.join(', ')}`
                    } else {
                        task.text = `Delete`
                    }
                }
            })


        } else {


            for (const view of viewsByEntityState.entities) {
                if (view.name === (logicalName ? logicalName : name)) {
                    for (const item of view.data) {
                        if (item.name === e.target.value) {
                            let newarr = deleteEntitiesReducer.delete.filter((dd) => dd.filterViewId !== item.viewId)
                            dispatch(prepareEntitiesForDeleteItemsPutThemAll(newarr))

                        }
                    }

                }
            }



            defaultTasksState.map((task) => {
                
                if (task.entityName === name) {
                    task.filter = task.filter.filter((word: string) => word !== e.target.value)
                    if (task.filter.length === 0) {
                        task.records = true

                        if (task.maskOperation) {
                            task.text = `All Records ${task.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields are masked`
                        } else {
                            task.text = "Delete"
                        }
                    } else {
                        if (task.maskOperation) {
                            task.text = task.filter && task.filter.length === 0 ? `Nothing selected` : `View - ${task.filter.join(', ')}`
                        } else {
                            task.text = "Delete"
                        }
                    }


                }
            })



        }


        dispatch(setDefaultTasks(defaultTasksState))

    }



    const deleteFunc = useCallback(
        (item: string) => {
            defaultTasksState.map((task) => {
                if (task.entityName === name) {
                    task.filter = task.filter.filter((word: string) => word !== item)
                    if (task.filter.length === 0) {
                        task.records = true
                        if (task.maskOperation) {
                            task.text = `All Records ${task.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields are masked`
                        } else {
                            task.text = "Delete"
                        }
                    } else {
                        if (task.maskOperation) {
                            task.text = task.filter && task.filter.length === 0 ? `Nothing selected` : `View - ${task.filter.join(', ')}`
                        } else {
                            task.text = "Delete"
                        }
                    }
                }
            })
            dispatch(setDefaultTasks(defaultTasksState))
        },
        [defaultTasksState, dispatch, name],
    )

    return (
        <div className="dropdown__content__head">
            <Box type='small'>
                <div className="dropdown__box__container">
                    <div className="dropdown__box__container__main">
                        <RadioButton name="all" color="blue" checked={records} onChange={handleSelectFilter} label={"All records"} />
                        <div className="dropdown__box__container__main__filter">
                            <RadioButton name="special" color="blue" checked={!records} onChange={handleSelectFilter} />
                            <MultipleSelect placeholder='Select view to edit' data={selectData} deleteFunc={deleteFunc} values={filter && filter} chose={chose} />
                        </div>
                    </div>
                    {
                        filter && filter.length === 0 ? <div className="dropdown__box__container__actions">
                            <RadioButton className='small' name="delete" color="green" checked={typeof deleteOrMask === 'boolean' && !deleteOrMask} onChange={handleSelectFilter} label={"Delete"} />
                            <RadioButton className='small' name="masking" color="green" checked={typeof deleteOrMask === 'boolean' && deleteOrMask} onChange={handleSelectFilter} label={"Maksing"} />
                        </div> :
                            <div className=""></div>
                    }
                </div>
            </Box>
        </div>
    )
}

export default DropdownContentHeader