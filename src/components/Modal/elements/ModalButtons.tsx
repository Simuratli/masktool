import React, { useCallback } from 'react';
import Button from '../../Button';
import { useDispatch, useSelector } from 'react-redux';
import { setToggleModal, setDefaultTasks, setModalDeleted } from '../../../redux/actions';
import { ReducerType } from '../../../redux/reducers/reducer.types'

function ModalFooterButtons() {
    const dispatch = useDispatch()
    const modalState = useSelector((state: ReducerType) => state.modalReducer.name)
    const modalStateDeleted = useSelector((state: ReducerType) => state.modalReducer.delete)
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks)


    const confirmDelete = useCallback(
        () => {
            let newDefaultTaskState = defaultTasksState.filter((task) => {
                return task.entityName !== modalState
            })
            dispatch(setDefaultTasks(newDefaultTaskState))
            // dispatch(setToggleModal(false))
            dispatch(setModalDeleted(true))
        },
        [],
    )


    const closeModal = () => {
        dispatch(setToggleModal(false))
        dispatch(setModalDeleted(false))
    }

    return (
        <div className="modal__buttons">
            {
                !modalStateDeleted ?
                    <>
                        <Button onClick={closeModal} type='outlined__modal' text='Back' />
                        <Button onClick={confirmDelete} type='normal__modal' text='Confirm' />
                    </>
                    :
                    <>
                        <Button onClick={closeModal} type='success__modal' text='Ok' />
                    </>
            }

        </div>
    )
}

export default React.memo(ModalFooterButtons)