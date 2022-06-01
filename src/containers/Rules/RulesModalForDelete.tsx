import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Modal, Button, Header } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { setModaleActionsAllow, setDefaultTasks, setModalDeleted, setToggleModal } from '../../redux/actions'

function RulesModalForDelete() {
    const dispatch = useDispatch();
    const modalState = useSelector((state: ReducerType) => state.modalReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks);

    useEffect(() => {
        console.log(defaultTasksState, 'defaultTasksState changed')
    }, [defaultTasksState])


    const cutArray = async (array: any, name: string) => {

        const index = array.findIndex((task: any) => {
            return task.entityName === name;
        });

        if (index > -1) {
            array.splice(index, 1); // 2nd parameter means remove one item only
        }

        return array
    }

    const confirmDelete = useCallback(
        async () => {
            // let newDefaultTaskState = defaultTasksState.filter((task) => {
            //     return task.entityName !== modalState.name
            // })

            let newArray = await cutArray(defaultTasksState, modalState.name)


            dispatch(setDefaultTasks(newArray))

            dispatch(setModaleActionsAllow(true))
            console.log(newArray, 'newDefaultTaskState deleted')
            // let newDefaultTaskState = defaultTasksState.splice(index, 1)


            console.log(newArray, 'newDefaultTaskState newArray')
            // dispatch(setDefaultTasks(newDefaultTaskState))
            // dispatch(setToggleModal(false))
            dispatch(setModalDeleted(true))
        },
        [modalState.name, defaultTasksState, cutArray],
    )


    const closeModal = () => {
        dispatch(setToggleModal(false))
        dispatch(setModalDeleted(false))
        dispatch(setModaleActionsAllow(false))
    }


    return (
        <Modal>
            <div className="modal__header__container">
                <Header headerType='modal__header' text='Deleting Confirm' />{modalState.delete && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM10.75 13.4393L15.2197 8.96967C15.5126 8.67678 15.9874 8.67678 16.2803 8.96967C16.5466 9.23594 16.5708 9.6526 16.3529 9.94621L16.2803 10.0303L11.2803 15.0303C11.0141 15.2966 10.5974 15.3208 10.3038 15.1029L10.2197 15.0303L7.71967 12.5303C7.42678 12.2374 7.42678 11.7626 7.71967 11.4697C7.98594 11.2034 8.4026 11.1792 8.69621 11.3971L8.78033 11.4697L10.75 13.4393L15.2197 8.96967L10.75 13.4393Z" fill="#80BB5B" />
                </svg>}
            </div>
            {
                !modalState.delete ?
                    <p className="modal__text">Are you sure you want to remove {modalState.name} from the list?</p>
                    :
                    <p className="modal__text">{modalState.name} was successfully removed.</p>
            }

            <div className="modal__buttons">
                {
                    !modalState.delete ?
                        <>
                            <Button onClick={closeModal} type='normal__modal' text='Back' />
                            <Button onClick={confirmDelete} type='normal__modal gold' text='Continue' />
                        </>
                        :
                        <>
                            <Button onClick={closeModal} type='success__modal' text='Ok' />
                        </>
                }

            </div>

        </Modal>
    )
}

export default RulesModalForDelete