import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Modal, Button, Header, Checkbox } from '../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../../redux/reducers/reducer.types';
import { setModaleActionsAllow, setDefaultTasks, setModalDeleted, setToggleModal, setModalAddField, setModalAddEntity, setStableDefaultTasks } from '../../../redux/actions'
import { DefaultTasksTypes } from '../../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'


function RulesModalForAddEntity() {
    const dispatch = useDispatch();
    const paginatedDataState = useSelector((state: ReducerType) => state.paginatedTasksdReducer.paginated)
    const stableDataReducer = useSelector((state: ReducerType) => state.stableDataReducer.tasks)
    const paginationState = useSelector((state: ReducerType) => state.paginationReducer.range)
    const [cuttedStableData, setcuttedStableData] = useState<DefaultTasksTypes[]>([])
    const [selectedEntites, setselectedEntites] = useState<string[]>([])

    useEffect(() => {
        setcuttedStableData(stableDataReducer.slice(0, paginationState))
    }, [paginationState, stableDataReducer])







    const confirm = useCallback(
        () => {
            let newArrayForDefaultTasks: any = [];
            stableDataReducer.map((task) => {
                selectedEntites.map((ent) => {
                    if (ent === task.entityName) {
                        if (!paginatedDataState.some((value) => value.entityName === task.entityName)) {
                            newArrayForDefaultTasks.push(task)
                            console.log(task, 'addedd newArrayForDefaultTasks')
                        }
                    }
                })
            })
            newArrayForDefaultTasks = [...paginatedDataState, ...newArrayForDefaultTasks]
            dispatch(setDefaultTasks(newArrayForDefaultTasks))
            console.log(newArrayForDefaultTasks, 'newArrayForDefaultTasks')
            dispatch(setModalAddEntity(false))
        },
        [paginatedDataState, selectedEntites, stableDataReducer],
    )


    const closeModal = () => {
        dispatch(setToggleModal(false))
        dispatch(setModalDeleted(false))
        dispatch(setModaleActionsAllow(false))
        dispatch(setModalAddField(false))
        dispatch(setModalAddEntity(false))
    }


    const selectCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.checked) {
            setselectedEntites((prev) => [...prev, e.target.value])
        } else {
            setselectedEntites((prev) => prev.filter((value) => value !== e.target.value))
        }
    }


    return (
        <Modal>
            <div className="modal__header__container">
                <Header headerType='modal__header' text='Select entities from list' />
            </div>
            <div className='modal__scroll__container'>
                {
                    cuttedStableData.map((item) => {
                        return <div className="modal__checkbox"><Checkbox value={item.entityName} onChange={selectCheckbox} text={item.entityName} /></div>
                    })
                }
            </div>
            <div className="modal__buttons">
                <Button onClick={closeModal} type='outlined__modal' text='Back' />
                <Button onClick={confirm} type='normal__modal' text='Confirm' />
            </div>
        </Modal>
    )
}

export default RulesModalForAddEntity