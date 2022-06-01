import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Modal, Button, Header } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { setPaginatedTasks, setModaleActionsAllow, setModalDeleted, setToggleModal, setProgressAdd, setCurrentRequest, setStep, setModalToggleActions, setDefaultTasks } from '../../redux/actions'
import { CreateTask, GetTasksStatus, ClearTasks } from '../../api';
import { prepareIndividualForDelete } from '../../utils/run.utils'

function RulesModalForRun({ onConfirm }: any) {
    const dispatch = useDispatch();
    const modalState = useSelector((state: ReducerType) => state.modalReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const paginatedData = useSelector((state: ReducerType) => state.paginatedTasksdReducer);
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites.delete);
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);



    const confirmDelete = useCallback(
        async () => {

            await ClearTasks()

            dispatch(setModalToggleActions(false))
            dispatch(setStep('progress'))
            let number = 1;

            for (const view of paginatedData.paginated) {
                paginatedData.paginated.map((task) => {
                    if (task.entityName === view.entityName) {
                        task.progress = "START"
                    }
                })

                dispatch(setPaginatedTasks(paginatedData.paginated))

                let preparedItem = await prepareIndividualForDelete(view);



                let requestMain: any

                if (!deleteEntitiesReducer.some((value) => value.entityName === view.entityName)) {
                    requestMain = await CreateTask(preparedItem);

                    let stopAskStatus = false
                    // while (!stopAskStatus) {
                    //     let statusRequest = await GetTasksStatus(requestMain);
                    //     console.log(statusRequest, 'statusRequest')
                    //     // eslint-disable-next-line no-loop-func
                    //     statusRequest.map((item: any) => {
                    //         console.log(item, view.entityName, 'bura bax')
                    //         if(item.taskStatus === 3 && item.taskStatus === 2 && item.taskStatus === 4){
                    //             stopAskStatus = true
                    //         }
                    //     })
                    // }

                }





                for (const entity of deleteEntitiesReducer) {
                    if (view.entityName === entity.entityName) {

                        console.log(deleteEntitiesReducer, 'preparedItem deleteEntitiesReducer')
                        console.log(entity, 'entity')
                        dispatch(setCurrentRequest({
                            name: entity.entityName,
                            progress: "Start",
                            id: entity.filterViewId
                        }))
                        let requestSecond

                        if (entity.maskOperation) {
                            requestSecond = await CreateTask({
                                entityName: entity.entityName,
                                fields: entity.fields,
                                filterViewId: entity.filterViewId,
                                maskOperation: entity.maskOperation

                            });
                        } else {
                            requestSecond = await CreateTask({
                                entityName: entity.entityName,
                                filterViewId: entity.filterViewId,
                                maskOperation: entity.maskOperation

                            });
                        }


                        dispatch(setCurrentRequest({
                            name: entity.entityName,
                            progress: "END",
                            succes: true,
                            id: entity.filterViewId
                        }))
                    }
                }



                paginatedData.paginated.map((task) => {
                    if (task.entityName === view.entityName) {
                        task.progress = "END"
                        task.requestResult = true
                    }
                })

                await new Promise(resolve => {
                    let interval = setInterval(async () => {
                        let statusRequest = await GetTasksStatus();
                        console.log(statusRequest, 'statusRequest')

                        for (const iterator of statusRequest) {
                            console.log(iterator, view.entityName, 'bura bax')

                            defaultTasksState.tasks.map((task) => {
                                if (task.entityName === view.entityName) {
                                    console.log(task.entityName, view.entityName,'names')
                                    task.successRecords = iterator.successRecords
                                    task.totalRecords = iterator.totalRecords
                                    
                                    if (iterator.taskStatus === 2) {
                                        task.errorMessage = true
                                        resolve('foo');
                                        clearInterval(interval)
                                    }

                                    if (iterator.taskStatus === 3) {
                                        task.errorMessage = false
                                        // resolve('foo');
                                        // clearInterval(interval)
                                    }
                                    if (iterator.taskStatus === 1 || iterator.taskStatus === 0) {
                                        task.errorMessage = null
                                    }
                                }
                            })

                            dispatch(setDefaultTasks(defaultTasksState.tasks))

                        }
                    }, 2500)
                })


                dispatch(setPaginatedTasks(paginatedData.paginated))

                dispatch(setProgressAdd(number++))
            }





        },
        [modalState.name, defaultTasksState, deleteEntitiesReducer, viewsByEntityState, paginatedData.paginated],
    )


    const closeModal = () => {
        dispatch(setToggleModal(false))
        dispatch(setModalDeleted(false))
        dispatch(setModaleActionsAllow(false))
    }


    return (
        <Modal>
            <div className="modal__header__container">
                <Header headerType='modal__header' text='Records with changes' />
            </div>

            <div className="modal__for__run__content">
                {
                    paginatedData.paginated.map((task) => {
                        return (
                            <div className="modal__for__run__item">
                                <span>{task.entityName}</span>
                                <span>{task.text}</span>
                            </div>
                        )
                    })
                }
            </div>

            <div className="modal__buttons">
                <Button onClick={closeModal} type='outlined__modal' text='Back' />
                <Button onClick={confirmDelete} type='normal__modal' text='Confirm' />
            </div>

        </Modal>
    )
}

export default RulesModalForRun