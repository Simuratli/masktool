import React, { useCallback, useState, useEffect } from 'react'
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
    const stableDataReducer = useSelector((state: ReducerType) => state.stableDataReducer)

    const [stable, setstable] = useState([])


    const handleSelectFilter = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            let actionValue = await choseActionForRecords(e.target.name)

            let newViewByEntityState = addDeleteOrMaskViaHeader(viewsByEntityState.entities, logicalName ? logicalName : name, true)
            dispatch(setAllViewsByEntity(newViewByEntityState))


            if (e.target.name === "delete") {
                defaultTasksState.map((task) => {
                    if (task.entityName === (name)) {

                        task.errorMessage = null
                        task.errortext = ''
                        task.maskOperation = false
                        if (task.records) {
                            task.text = "You are going to delete all records."
                        } else {
                            task.text = "You are going to delete 0 records as you have not chosen any view"
                        }
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
                        task.errorMessage = null
                        task.errortext = ''
                        task.maskOperation = true
                        if (!records) {
                            task.text = task.filter && task.filter.length === 0 ? `No edits will be applied to this entity as you have not chosen any view.` : `You are going to edit fields in ${task.filter.join(' ')}`
                        } else {
                            task.text = `You are going to mask ${task.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields in all records.`
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
                        task.errorMessage = null
                        task.errortext = ''
                        // task.maskOperation = true
                        task.records = true
                        if (task.maskOperation) {
                            task.text = `You are going to mask ${task.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields in all records.`
                        } else {
                            task.text = "You are going to delete all records."
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
                        task.errorMessage = null
                        task.errortext = ''
                        task.records = false

                        if (task.maskOperation) {
                            task.text = `No edits will be applied to this entity as you have not chosen any view.`
                        } else {
                            if (task.filter.length === 0) {
                                task.text = "You are going to delete 0 records as you have not chosen any view"
                            } else {
                                task.text = `You are going to edit records in ${task.filter.join(' ')}`
                            }
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
                    task.errorMessage = null
                    task.errortext = ''
                    task.filter = task.filter ? [...task.filter, e.target.value] : [e.target.value]
                    if (task.maskOperation) {
                        task.text = `You are going to edit fields in ${task.filter.join(' ')}`
                    } else {
                        if (task.filter.length === 0) {
                            task.text = `You are going to skip masking fields as you have not chosen any view`
                        } else {
                            task.text = `You are going to edit records in ${task.filter.join(' ')}`
                        }
                    }
                }
            })


        } else {




            for (const view of viewsByEntityState.entities) {
                if (view.name === (logicalName ? logicalName : name)) {
                    for (const item of view.data) {
                        if (item.name === e.target.value) {
                            
                            stableDataReducer.entities.map((stableitem) => {
                                if (stableitem.name === (logicalName ? logicalName : name)) {
                                    console.log(item, 'halobabe')
                                    stableitem.data.map((stableItemData)=>{
                                        if(stableItemData.name === e.target.value){
                                            item.cells = stableItemData.cells
                                        }
                                    })
                                }
                            })
                            
                            let newarr = deleteEntitiesReducer.delete.filter((dd) => dd.filterViewId !== item.viewId)
                            dispatch(prepareEntitiesForDeleteItemsPutThemAll(newarr))

                        }
                    }

                }
            }



            defaultTasksState.map((task) => {

                if (task.entityName === name) {
                    task.filter = task.filter.filter((word: string) => word !== e.target.value)
                    task.errorMessage = null
                    task.errortext = ''
                    if (task.filter.length === 0) {
                        task.records = true

                        if (task.maskOperation) {
                            task.text = `You are going to mask ${task.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields in all records.`
                        } else {
                            task.text = "You are going to delete all records."
                        }
                    } else {

                        if (task.maskOperation) {
                            task.text = task.filter && task.filter.length === 0 ? `No edits will be applied to this entity as you have not chosen any view.` : `You are going to edit fields in ${task.filter.join(' ')}`
                        } else {
                            task.text = "You are going to delete all records."
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
                    task.errorMessage = null
                    task.errortext = ''
                    if (task.filter.length === 0) {
                        task.records = true
                        if (task.maskOperation) {
                            task.text = `You are going to mask ${task.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields in all records.`
                        } else {
                            task.text = "You are going to delete all records."
                        }
                    } else {

                        if (task.maskOperation) {
                            task.text = task.filter && task.filter.length === 0 ? `No edits will be applied to this entity as you have not chosen any view.` : `You are going to edit fields in ${task.filter.join(' ')}`
                        } else {
                            task.text = "You are going to delete all records."
                        }
                    }
                }
            })

            for (const view of viewsByEntityState.entities) {
                if (view.name === (logicalName ? logicalName : name)) {
                    for (const data of view.data) {
                        if (data.name === item) {
                            stableDataReducer.entities.map((stableitem) => {
                                if (stableitem.name === (logicalName ? logicalName : name)) {
                                    console.log(item, 'halobabe')
                                    stableitem.data.map((stableItemData)=>{
                                        if(stableItemData.name === item){
                                            data.cells = stableItemData.cells
                                        }
                                    })
                                }
                            })
                            let newarr = deleteEntitiesReducer.delete.filter((dd) => dd.filterViewId !== data.viewId)
                            dispatch(prepareEntitiesForDeleteItemsPutThemAll(newarr))
                            console.log(deleteEntitiesReducer.delete, 'alonettt deleteEntitiesReducer')
                            console.log(data, 'alonettt data')
                            console.log(item, 'alonettt item')
                        }
                    }

                }
            }
            dispatch(setDefaultTasks(defaultTasksState))
        },
        [defaultTasksState, deleteEntitiesReducer.delete, dispatch, logicalName, name, viewsByEntityState.entities],
    )



    console.log(deleteEntitiesReducer, 'hfofofofoofofs')

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
                            <RadioButton className='small' name="masking" color="green" checked={typeof deleteOrMask === 'boolean' && deleteOrMask} onChange={handleSelectFilter} label={"Masking"} />
                        </div> :
                            <div className=""></div>
                    }
                </div>
            </Box>
        </div>
    )
}

export default DropdownContentHeader