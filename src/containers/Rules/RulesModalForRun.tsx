import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Modal, Button, Header } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { setPaginatedTasks, setModalAddField, setModalAddEntity, setToggleModal, setAllErroredTasks, setProgressAdd, setAllViewsByEntity, setStep, setCurrentRequest, setModalToggleActions, setDefaultTasks, setErroredTasks } from '../../redux/actions'
import { CreateTask, GetTasksStatus, ClearTasks } from '../../api';
import { prepareIndividualForDelete } from '../../utils/run.utils';
import { awaitForMainLoop } from './RULES__UTILS'

function RulesModalForRun() {
    const dispatch = useDispatch();
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const paginatedData = useSelector((state: ReducerType) => state.paginatedTasksdReducer);
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites);
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);
    const stepState = useSelector((state: ReducerType) => state.stepReducer.step);
    const erroredState = useSelector((state: ReducerType) => state.erroredTaskReducer);


    // const confirmDelete = useCallback(
    //     async () => {
    //         await ClearTasks()
    //         dispatch(setAllErroredTasks([]))
    //         dispatch(setModalToggleActions(false))
    //         dispatch(setStep('progress'))

    //         erroredState.tasks.map((task) => {
    //             task.errorMessage = null
    //         })

    //         dispatch(setAllErroredTasks(erroredState.tasks.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName === v.entityName)) === i)))
    //         dispatch(setProgressAdd(0))
    //         defaultTasksState.tasks.map((task) => {
    //             task.errorMessage = null
    //             task.open = false
    //         })

    //         dispatch(setDefaultTasks(defaultTasksState.tasks))

    //         for (const view of viewsByEntityState.entities) {

    //             for (const item of view.data) {

    //                 item.errorMessage = null
    //                 item.errortext = undefined

    //             }

    //         }


    //         let number = 1;
    //         for (const view of paginatedData.paginated) {
    //             paginatedData.paginated.map((task) => {
    //                 if (task.entityName === view.entityName) {
    //                     task.progress = "START"
    //                 }
    //             })



    //             let preparedItem = await prepareIndividualForDelete(view);

    //             paginatedData.paginated.map((task) => {
    //                 if (task.entityName === view.entityName) {
    //                     task.progress = "END"
    //                     task.requestResult = true
    //                 }
    //             })

    //             dispatch(setPaginatedTasks(paginatedData.paginated))

    //             if (!deleteEntitiesReducer.delete.some((value) => value.entityName === view.logicalName || value.entityName === view.entityName)) {
    //                 await CreateTask(preparedItem);
    //                 await new Promise(resolve => {
    //                     let interval = setInterval(async () => {
    //                         let statusRequest = await GetTasksStatus();
    //                         for (const iterator of statusRequest) {
    //                             let data = await awaitForMainLoop(defaultTasksState.tasks, view.entityName, iterator.successRecords, iterator.totalRecords, iterator.taskStatus, statusRequest, resolve, interval, iterator.errorMessage)
    //                             dispatch(setDefaultTasks(data))
    //                         }
    //                     }, 1500)
    //                 })
    //             }
    //             for (const entity of deleteEntitiesReducer.delete) {

    //                 if ((view.logicalName ? view.logicalName : view.entityName) === entity.entityName) {
    //                     dispatch(setCurrentRequest({
    //                         name: entity.entityName,
    //                         progress: "Start",
    //                         id: entity.filterViewId
    //                     }))

    //                     let requestSecond: any
    //                     if (entity.maskOperation) {
    //                         requestSecond = await CreateTask({
    //                             entityName: entity.entityName,
    //                             fields: entity.fields.filter((it:any) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7),
    //                             filterViewId: entity.filterViewId,
    //                             maskOperation: entity.maskOperation

    //                         });
    //                     } else {
    //                         requestSecond = await CreateTask({
    //                             entityName: entity.entityName,
    //                             filterViewId: entity.filterViewId,
    //                             maskOperation: entity.maskOperation

    //                         });
    //                     }


    //                     for (const view of viewsByEntityState.entities) {

    //                         if (view.name === entity.entityName) {

    //                             for (const item of view.data) {


    //                                 if (item.viewId === entity.filterViewId) {
    //                                     if (requestSecond.level === "ERROR") {
    //                                         item.errorMessage = true
    //                                         item.errortext = requestSecond.messages[0].message

    //                                         defaultTasksState.tasks.map((task) => {
    //                                             if (task.entityName === view.name || task.logicalName === view.name) {
    //                                                 task.errorMessage = true
    //                                                 task.errortext = requestSecond.messages[0].message
    //                                             }
    //                                         })

    //                                         dispatch(setDefaultTasks(defaultTasksState.tasks))
    //                                     }
    //                                     if (requestSecond.level === "SUCCESS") {
    //                                         item.errorMessage = false
    //                                         await new Promise(resolve => {
    //                                             let intervalSecond = setInterval(async () => {
    //                                                 let statusRequestSecond = await GetTasksStatus();
    //                                                 statusRequestSecond.map((statusItem: any) => {
    //                                                     if (statusItem.entityName === entity.entityName) {
    //                                                         if (statusItem.taskStatus === 1 || statusItem.taskStatus === 0) {
    //                                                             item.errorMessage = null
    //                                                         }
    //                                                         if (!statusRequestSecond.some((value: any) => value.taskStatus === 0 || value.taskStatus === 1)) {
    //                                                             clearInterval(intervalSecond)
    //                                                             resolve('foo');
    //                                                         }
    //                                                         if (statusItem.taskStatus === 2) {
    //                                                             item.errorMessage = true
    //                                                             item.errortext = statusItem.errorMessage
    //                                                             defaultTasksState.tasks.map((task) => {
    //                                                                 if (task.entityName === view.name || task.logicalName === view.name) {
    //                                                                     task.errorMessage = true
    //                                                                     // task.errortext = requestSecond.messages[0].message
    //                                                                 }
    //                                                             })

    //                                                             dispatch(setDefaultTasks(defaultTasksState.tasks))

    //                                                         }

    //                                                         if (statusItem.taskStatus === 3) {
    //                                                             item.errorMessage = false
    //                                                             defaultTasksState.tasks.map((task) => {
    //                                                                 if (task.entityName === view.name) {
    //                                                                     task.errorMessage = false
    //                                                                 }
    //                                                             })
    //                                                         }

    //                                                     }
    //                                                 })


    //                                             }, 1500)
    //                                         })

    //                                     }

    //                                 }

    //                             }


    //                         }

    //                     }




    //                     dispatch(setCurrentRequest({
    //                         name: entity.entityName,
    //                         progress: "END",
    //                         succes: true,
    //                         id: entity.filterViewId
    //                     }))
    //                 }

    //             }

    //             dispatch(setProgressAdd(number++))
    //         }
    //     },
    //     [dispatch, paginatedData, deleteEntitiesReducer, defaultTasksState.tasks, viewsByEntityState],
    // )


    const confirmDelete = async () => {
        await ClearTasks()
        dispatch(setAllErroredTasks([]))
        dispatch(setModalToggleActions(false))
        dispatch(setStep('progress'))
        erroredState.tasks.map((task) => {
            task.errorMessage = null
        })

        dispatch(setAllErroredTasks(erroredState.tasks.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName === v.entityName)) === i)))
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


        setTimeout(() => {
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

                                                    defaultTasksState.tasks.map((task) => {
                                                        if (task.entityName === view.name || task.logicalName === view.name) {
                                                            task.errorMessage = true
                                                            // task.errortext = requestSecond.messages[0].message
                                                        }
                                                    })

                                                    // dispatch(setDefaultTasks(defaultTasksState.tasks))

                                                }



                                                if (status.taskStatus === 3) {
                                                    vi.errorMessage = false
                                                    defaultTasksState.tasks.map((task) => {
                                                        if (task.entityName === view.name || task.logicalName === view.name) {
                                                            task.errorMessage = false
                                                            // task.errortext = requestSecond.messages[0].message
                                                        }
                                                    })


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
                    dispatch(setProgressAdd(notsame.length > deletedLength ? notsame.length - deletedLength : notsame.length))
                    if (!data.some((value: any) => value.taskStatus === 0 || value.taskStatus === 1)) {
                        dispatch(setProgressAdd(paginatedData.paginated.length))
                        ClearTasks()
                        clearInterval(interval)
                    }


                })
            }, 3000)
        }, 1000);



    }

    const closeModal = () => {
        dispatch(setToggleModal(false))
        dispatch(setModalToggleActions(false))
        dispatch(setModalAddEntity(false))
        dispatch(setModalAddField(false))
    }


    return (
        <Modal>
            <div className="modal__header__container">
                <Header headerType='modal__header' text='Records with changes' />
            </div>

            <div style={{ height: 150, overflow: 'hidden scroll', paddingBottom: 10 }} className="modal__for__run__content">
                {
                    paginatedData.paginated.map((task) => {
                        return (
                            <div className="modal__for__run__item run_item">
                                <span>{task.entityName}</span>
                                <span className='modal__actions__container'>{task.text ? task.text : 'Delete'}</span>
                            </div>
                        )
                    })
                }
            </div>

            <div className="modal__buttons">
                <Button onClick={closeModal} type='normal__modal' text='Cancel' />
                <Button onClick={confirmDelete} type='normal__modal gold' text='Continue' />
            </div>

        </Modal>
    )
}

export default RulesModalForRun