import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Modal, Button, Header, Checkbox } from '../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../../redux/reducers/reducer.types';
import { setModaleActionsAllow, setDefaultTasks, setModalDeleted, setToggleModal, setModalAddField, setModalAddEntity, setStableDefaultTasks } from '../../../redux/actions'
import { DefaultTasksTypes } from '../../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'

function getDifference(array1: DefaultTasksTypes[], array2: DefaultTasksTypes[]) {
    return array1.filter(object1 => {
        return !array2.some(object2 => {
            return object1.entityName === object2.entityName;
        });
    });
}

function RulesModalForAddEntity() {
    const dispatch = useDispatch();
    const paginatedDataState = useSelector((state: ReducerType) => state.paginatedTasksdReducer.paginated)
    const stableDataReducer = useSelector((state: ReducerType) => state.stableDataReducer.tasks)
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks)
    const paginationState = useSelector((state: ReducerType) => state.paginationReducer.range)
    const [cuttedStableData, setcuttedStableData] = useState<DefaultTasksTypes[]>([])
    const [selectedEntites, setselectedEntites] = useState<DefaultTasksTypes[]>([])

    useEffect(() => {
        let data = getDifference(stableDataReducer, defaultTasksState)
        setcuttedStableData(data)
    }, [defaultTasksState, paginationState, stableDataReducer])







    const confirm = useCallback(
        () => {
            let newArrayForDefaultTasks: any = [];
            stableDataReducer.map((task) => {
                selectedEntites.map((ent) => {
                    if (ent.entityName === task.entityName) {
                        if (!paginatedDataState.some((value) => value.entityName === task.entityName || value.entityName === task.displayName)) {
                            newArrayForDefaultTasks.push(task)
                        }
                    }
                })
            })
            newArrayForDefaultTasks = [...newArrayForDefaultTasks, ...paginatedDataState]
            dispatch(setDefaultTasks(newArrayForDefaultTasks))
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


    const selectCheckbox = (e: React.ChangeEvent<HTMLInputElement>, item: DefaultTasksTypes) => {
        if (e.target.checked) {
            setselectedEntites((prev) => [...prev, item])
        } else {
            setselectedEntites((prev) => prev.filter((value) => value.entityName !== e.target.value))
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
                        return <div className="modal__checkbox"><Checkbox value={item.entityName} onChange={(e) => { selectCheckbox(e, item) }} text={item.entityName} /></div>
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