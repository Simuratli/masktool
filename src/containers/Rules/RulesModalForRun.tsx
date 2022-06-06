import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Modal, Button, Header } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { setPaginatedTasks, setModaleActionsAllow, setModalDeleted, setToggleModal, setProgressAdd, setCurrentRequest, setStep, setModalToggleActions, setDefaultTasks, setErroredTasks } from '../../redux/actions'
import { CreateTask, GetTasksStatus, ClearTasks } from '../../api';
import { prepareIndividualForDelete } from '../../utils/run.utils';

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
                paginatedData.paginated.map((task) => {
                    if (task.entityName === view.entityName) {
                        task.progress = "END"
                        task.requestResult = true
                    }
                })
                dispatch(setPaginatedTasks(paginatedData.paginated))
                if (!deleteEntitiesReducer.some((value) => value.entityName === view.entityName)) {
                    requestMain = await CreateTask(preparedItem);


                    await new Promise(resolve => {
                        let interval = setInterval(async () => {
                            let statusRequest = await GetTasksStatus();
                            console.log(statusRequest, 'statusRequest')
                            for (const iterator of statusRequest) {

                                defaultTasksState.tasks.map((task) => {
                                    if (task.entityName === view.entityName) {
                                        task.successRecords = iterator.successRecords
                                        task.totalRecords = iterator.totalRecords

                                        if (iterator.taskStatus === 2) {
                                            task.errorMessage = true
                                        }


                                        if (iterator.taskStatus === 3) {
                                            task.errorMessage = false
                                            // resolve('foo');
                                            // clearInterval(interval)
                                        }

                                        if (iterator.taskStatus === 1 || iterator.taskStatus === 0) {
                                            task.errorMessage = null
                                        }

                                        if (!statusRequest.some((value: any) => value.taskStatus === 0 || value.taskStatus === 1)) {
                                            resolve('foo');
                                            clearInterval(interval)
                                        }
                                    }
                                })

                                dispatch(setDefaultTasks(defaultTasksState.tasks))

                            }
                        }, 1500)
                    })

                }





                for (const entity of deleteEntitiesReducer) {
                    if (view.entityName === entity.entityName) {

                        dispatch(setCurrentRequest({
                            name: entity.entityName,
                            progress: "Start",
                            id: entity.filterViewId
                        }))


                        let requestSecond: any

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
                        console.log(requestSecond, 'requestSecond')

                        viewsByEntityState.entities.map((view) => {

                            if (view.name === entity.entityName) {

                                console.log(view, 'viewwwww')

                                view.data.map((item) => {
                                    if (item.viewId === entity.filterViewId) {
                                        console.log(item, 'burasi calisdi')
                                        if (requestSecond.level === "ERROR") {
                                            item.errorMessage = true

                                            defaultTasksState.tasks.map((task) => {
                                                if (task.entityName === view.name) {
                                                    task.errorMessage = true
                                                }
                                            })

                                            dispatch(setDefaultTasks(defaultTasksState.tasks))
                                        }
                                        if (requestSecond.level === "SUCCESS") {
                                            item.errorMessage = false
                                        }

                                    }
                                })
                            }
                        })
                        console.log(viewsByEntityState, 'entttt')

                        dispatch(setCurrentRequest({
                            name: entity.entityName,
                            progress: "END",
                            succes: true,
                            id: entity.filterViewId
                        }))
                    }
                }



                dispatch(setProgressAdd(number++))
            }





        },
        [modalState.name, defaultTasksState, deleteEntitiesReducer, viewsByEntityState, paginatedData],
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