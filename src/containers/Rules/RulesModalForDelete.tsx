import React, { useEffect, useState, useMemo, useCallback, Reducer } from 'react';
import { Modal, Button, Header } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { setModaleActionsAllow, setAllErroredTasks, setDefaultTasks, setModalDeleted, setToggleModal } from '../../redux/actions'

function RulesModalForDelete() {
    const dispatch = useDispatch();
    const modalState = useSelector((state: ReducerType) => state.modalReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks);
    const errororedState = useSelector((state: ReducerType) => state.erroredTaskReducer.tasks)

    const cutArray = async (array: any, name: string) => {

        const index = array.findIndex((task: any) => {
            task.open = false
            // task.filter = []
            return task.entityName === name;
        });

        if (index > -1) {
            array.splice(index, 1); // 2nd parameter means remove one item only
        }

        return array
    }

    const confirmDelete = useCallback(
        async () => {

            let newArray = await cutArray(defaultTasksState, modalState.name)
            let newArrayErrored = await cutArray(errororedState, modalState.name)
            dispatch(setAllErroredTasks(newArrayErrored))
            dispatch(setDefaultTasks(newArray))
            dispatch(setModaleActionsAllow(true))
            dispatch(setModalDeleted(true))
        },
        [defaultTasksState, modalState.name, dispatch],
    )


    const closeModal = () => {
        dispatch(setToggleModal(false))
        dispatch(setModalDeleted(false))
        dispatch(setModaleActionsAllow(false))
    }


    return (
        <Modal>
            <div className="modal__header__container">
                {
                    modalState.delete  ? <div className='deleteConfirmText'>Success!</div> : <Header headerType='modal__header' text='Confirm Entity Removing' />
                }
            </div>
            {
                !modalState.delete ?
                    <p className="modal__text">Are you sure you want to remove <span className="capitalize">{modalState.name}</span> from the list?</p>
                    :
                    <p className="modal__text"><span className="capitalize">{modalState.name}</span> entity was successfully removed.</p>
            }

            <div className="modal__buttons">
                {
                    !modalState.delete ?
                        <>
                            <Button onClick={closeModal} type='normal__modal' text='Cancel' />
                            <Button onClick={confirmDelete} type='normal__modal gold' text='Continue' />
                        </>
                        :
                        <>
                            <Button onClick={closeModal} type='success__modal' text='Close' />
                        </>
                }

            </div>

        </Modal>
    )
}

export default RulesModalForDelete