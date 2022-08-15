import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Modal, Button, Header } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { setPaginatedTasks, setModalAddField, setModalAddEntity, setToggleModal, setAllErroredTasks, setProgressAdd, setAllViewsByEntity, setStep, setCurrentRequest, setModalToggleActions, setDefaultTasks, setErroredTasks } from '../../redux/actions'
import { CreateTask, GetTasksStatus, ClearTasks, ClearTasksAndLogs } from '../../api';
import { prepareIndividualForDelete } from '../../utils/run.utils';
import { awaitForMainLoop } from './RULES__UTILS'
import Icon from './infoIcon'

function RulesModalForRun() {
    const dispatch = useDispatch();
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const paginatedData = useSelector((state: ReducerType) => state.paginatedTasksdReducer);
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites);
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);
    const stepState = useSelector((state: ReducerType) => state.stepReducer.step);
    const erroredState = useSelector((state: ReducerType) => state.erroredTaskReducer);
    const [loadButton, setLoadButton] = useState(false)



    const confirmDelete = async () => {
        setLoadButton(true)
        // await ClearTasks()
        await ClearTasksAndLogs()
        dispatch(setAllErroredTasks([]))
        dispatch(setModalToggleActions(false))
        dispatch(setStep('progress'))
        setLoadButton(false)
        erroredState.tasks.map((task) => {
            task.errorMessage = null
        })

        // dispatch(setAllErroredTasks(erroredState.tasks.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName === v.entityName)) === i)))
        dispatch(setProgressAdd(0))
        defaultTasksState.tasks.map((task) => {
            task.errorMessage = null
            task.open = false
        })

        dispatch(setDefaultTasks(defaultTasksState.tasks))
        for (const view of viewsByEntityState.entities) {

            for (const item of view.data) {
                item.errorMessage = null
                item.errortext = undefined

            }
        }


        console.log(paginatedData, 'asfnsdfsdfsf')

        paginatedData.paginated.map(async (item) => {
            paginatedData.paginated.map((task) => {
                if (task.entityName === item.entityName) {
                    task.progress = "END"
                    task.requestResult = true
                }
            })

            dispatch(setPaginatedTasks(paginatedData.paginated))

            if (!deleteEntitiesReducer.delete.some((value) => value.entityName === item.logicalName || value.entityName === item.entityName)) {
                console.log("iamnot", item)
                let preparedItem = await prepareIndividualForDelete(item);
                await CreateTask(preparedItem);
            } else {
                deleteEntitiesReducer.delete.map(async (deleted) => {
                    if ((item.logicalName ? item.logicalName : item.entityName) === deleted.entityName) {
                        if (deleted.maskOperation) {
                            await CreateTask({
                                entityName: deleted.entityName,
                                fields: deleted.fields.filter((it: any) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7),
                                filterViewId: deleted.filterViewId,
                                maskOperation: deleted.maskOperation

                            });
                        } else {
                            await CreateTask({
                                entityName: deleted.entityName,
                                filterViewId: deleted.filterViewId,
                                maskOperation: deleted.maskOperation

                            });
                        }
                    }
                })
            }

        })


        let interval = setInterval(() => {
            GetTasksStatus().then((data) => {
                console.log(data, 'tassakmigeciyon')

                data.map((status: any) => {
                    if (status) {
                        if (!status.filterViewId) {
                            defaultTasksState.tasks.map((task) => {
                                if (status.entityName === (task.logicalName ? task.logicalName : task.entityName)) {

                                    task.successRecords = status.successRecords
                                    task.totalRecords = status.totalRecords

                                    if (status.taskStatus === 2) {
                                        task.errorMessage = true
                                        task.errortext = status.errorMessage
                                    }

                                    if (status.taskStatus === 3) {
                                        task.errorMessage = false
                                        if (task.maskOperation) {
                                            task.text = `${task.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields in ${status.successRecords} records were masked.`
                                        } else {
                                            task.text = `${status.successRecords} records were deleted.`
                                        }
                                    }

                                    if (status.taskStatus === 1 || status.taskStatus === 0) {
                                        task.errorMessage = null
                                    }

                                }
                            })

                        } else {
                            // burda double

                            // console.log(viewsByEntityState.entities, 'viewsByEntityState.entities')


                            viewsByEntityState.entities.map((view) => {
                                if (view.name && view.name === status.entityName) {
                                    view.data.map((vi) => {
                                        if (vi.viewId === status.filterViewId) {

                                            vi.totalRecords = status.totalRecords
                                            vi.successRecords = status.successRecords
                                            if (status.taskStatus === 1 || status.taskStatus === 0) {
                                                vi.errorMessage = null

                                            }

                                            if (status.taskStatus === 2) {
                                                vi.errorMessage = true
                                                vi.errortext = status.errorMessage

                                                // defaultTasksState.tasks.map((task) => {
                                                //     if (task.entityName === view.name || task.logicalName === view.name) {
                                                //         task.errorMessage = true
                                                //         // task.errortext = requestSecond.messages[0].message
                                                //     }
                                                // })

                                                // dispatch(setDefaultTasks(defaultTasksState.tasks))

                                            }



                                            if (status.taskStatus === 3) {
                                                vi.errorMessage = false
                                                // defaultTasksState.tasks.map((task) => {
                                                //     if (task.entityName === view.name || task.logicalName === view.name) {
                                                //         task.errorMessage = false
                                                //         // task.errortext = requestSecond.messages[0].message
                                                //         if (task.maskOperation) {
                                                //             task.text = `${task.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields in all records were masked.`
                                                //         } else {
                                                //             task.text = "All records were deleted."
                                                //         }
                                                //     }
                                                // })


                                            }

                                        }
                                    })

                                }

                            })

                            dispatch(setAllViewsByEntity(viewsByEntityState.entities))
                        }
                    }
                })

                dispatch(setDefaultTasks(defaultTasksState.tasks))

                let deletedLength = deleteEntitiesReducer.delete.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName === v.entityName)) === i).length

                let notsame = data.filter((item: any) => item.taskStatus === 2 || item.taskStatus === 3).filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName === v.entityName)) === i)
                console.log(notsame, "deletedLength")
                // dispatch(setProgressAdd(notsame.length > deletedLength ? notsame.length - deletedLength : notsame.length))



                let obj = data.reduce((res: any, curr: any) => {
                    if (res[curr.entityName])
                        res[curr.entityName].push(curr);
                    else
                        Object.assign(res, { [curr.entityName]: [curr] });

                    return res;
                }, {});


                Object.keys(obj).map(function (key) {
                    if (!obj[key].some((value: any) => value.taskStatus === 0 || value.taskStatus === 1)) {
                        console.log(obj[key], 'obj[key]')
                        if (obj[key].some((value: any) => value.taskStatus === 2)) {
                            console.log(obj[key], 'hhohoho')
                        }

                        defaultTasksState.tasks.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i).map((t) => {
                            console.log('sal5 taskStatustaskStatus', t.entityName, key)
                            if ((t.logicalName ? t.logicalName : t.entityName) === key) {
                                if (obj[key].some((value: any) => value.taskStatus === 2)) {
                                    t.errorMessage = true
                                } else {
                                    t.errorMessage = false
                                }
                            }
                        })

                        dispatch(setDefaultTasks(defaultTasksState.tasks.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i)))

                    }
                });


                let num = 0
                data.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName === v.entityName)) === i).map((dat: any) => {

                    if (!obj[dat.entityName].some((value: any) => value.taskStatus === 0 || value.taskStatus === 1)) {
                        console.log(obj[dat.entityName], 'offfffffffffffffffffffffffffffffffffff data22')
                        num++
                        dispatch(setProgressAdd(num))
                    }

                })



                if (!data.some((value: any) => value.taskStatus === 0 || value.taskStatus === 1)) {
                    dispatch(setProgressAdd(paginatedData.paginated.length))
                    // ClearTasks()
                    clearInterval(interval)
                }


            })
        }, 2000)



    }

    const closeModal = () => {
        dispatch(setToggleModal(false))
        dispatch(setModalToggleActions(false))
        dispatch(setModalAddEntity(false))
        dispatch(setModalAddField(false))
    }

    const modalState = useSelector((state: ReducerType) => state.modalReducer);

  

    return (
        <Modal>
            <div className="modal__header__container">
                <Header headerType='modal__header' text='Records with changes' />
            </div>

            <div style={{ height: 250, overflow: 'hidden scroll', paddingBottom: 10 }} className="modal__for__run__content">
                {

                    paginatedData.paginated.filter((v, i, a) => a.findIndex(v2 => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i).map((task) => {
                        return (
                            <div className="modal__for__run__item run_item">
                                <span>{task.entityName}</span>
                                <span className='modal__actions__container'>{task.text ? task.text : 'You are going to delete all records.'}</span>
                            </div>
                        )
                    })
                }
            </div>


            <div className='modal__info__icon__text'>
                <Icon />
            </div>

            <div className="modal__buttons">
                <Button onClick={closeModal} type='normal__modal' text='Cancel' />
                <Button addLoading={loadButton} onClick={confirmDelete} type={`normal__modal  ${loadButton ? 'gray' : "gold"}`} text='Continue' />
            </div>

        </Modal>
    )
}

export default RulesModalForRun