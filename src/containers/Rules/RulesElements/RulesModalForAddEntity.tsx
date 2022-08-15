import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Modal, Button, Header, Checkbox } from '../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../../redux/reducers/reducer.types';
import { getPaginatedData } from '../../../utils/pagiantionUtil'
import { setModaleActionsAllow, setPaginatedTasks, setDefaultTasks, setModalDeleted, setToggleModal, setModalAddField, setModalAddEntity, setAllErroredTasks } from '../../../redux/actions'
import { DefaultTasksTypes } from '../../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'
import { compareStrings } from '../../../utils/alphabeticalOrder.util'

function getDifference(array1: DefaultTasksTypes[], array2: DefaultTasksTypes[]) {
    return array1.filter(object1 => {
        return !array2.some(object2 => {
            return object1.entityName.toLowerCase() === object2.entityName.toLowerCase();
        });
    });
}

function RulesModalForAddEntity() {
    const dispatch = useDispatch();
    const paginatedDataState = useSelector((state: ReducerType) => state.paginatedTasksdReducer.paginated)
    const stableDataReducer = useSelector((state: ReducerType) => state.stableDataReducer.tasks)
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks)
    const stepState = useSelector((state: ReducerType) => state.stepReducer.step);
    const paginationState = useSelector((state: ReducerType) => state.paginationReducer.range)
    const paginationStateCurrent = useSelector((state: ReducerType) => state.paginationReducer)
    const [cuttedStableData, setcuttedStableData] = useState<DefaultTasksTypes[]>([])
    const [acuttedStableData, setacuttedStableData] = useState<DefaultTasksTypes[]>([])
    const [selectedEntites, setselectedEntites] = useState<DefaultTasksTypes[]>([])
    const [search, setsearch] = useState('')
    const errororedState = useSelector((state: ReducerType) => state.erroredTaskReducer.tasks)

    useEffect(() => {

        let data = getDifference(stableDataReducer, defaultTasksState)

        let newDarta = data.sort(function (a, b) {
            return compareStrings(a.entityName, b.entityName);
        })


        setcuttedStableData(newDarta.filter((v, i, a) => a.findIndex(v2 => (v2.entityName === v.entityName)) === i))
        setacuttedStableData(newDarta.filter((v, i, a) => a.findIndex(v2 => (v2.entityName === v.entityName )) === i))
    }, [defaultTasksState, paginationState, stableDataReducer])



    const SearchInput = (e: any) => {
        setsearch(e.target.value)

        const newCutted = acuttedStableData.filter(
            entity => {
                return (
                    entity
                        .entityName
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()));
            }
        ).filter((v, i, a) => a.findIndex(v2 => (v2.entityName === v.entityName )) === i);
        setcuttedStableData(newCutted)
    }


    const confirm = useCallback(
        () => {
            let newArrayForDefaultTasks: any = [];
            stableDataReducer.map((task) => {
                selectedEntites.map((ent) => {
                    if (ent.entityName === task.entityName) {
                        if (!paginatedDataState.some((value) => value.entityName === task.entityName )) {


                            task.open = false
                            task.records = true
                            task.errorMessage = null
                            task.errortext = ''
                            task.progress = 'NULL'
                            task.filter = []
                            task.maskOperation = false

                            if (task.entityName.toLowerCase() === "lead") {
                                task.maskOperation = true


                                // stableDataReducer.map((item) => {
                                //     if (item.entityName === "lead") {
                                //         task.fields = item.fields
                                //         task.fields = item.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7)
                                //     }
                                // })
                            }

                            if (task.entityName.toLowerCase() === "account" || task.entityName.toLowerCase() === "lead" || task.entityName.toLowerCase() === "contact") {
                                task.maskOperation = true
                                task.records = true
                            }

                            if (task.entityName.toLowerCase() === "contact") {
                                task.maskOperation = true
                                task.records = true
                                // stableDataReducer.map((item) => {
                                //     if (item.entityName === "contact") {
                                //         task.fields = item.fields
                                //         task.fields = item.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7)
                                //     }
                                // })
                            }

                            if (task.entityName.toLowerCase() === "account") {
                                task.maskOperation = true
                                task.records = true
                                // stableDataReducer.map((item) => {
                                //     if (item.entityName === "account") {
                                //         task.fields = item.fields
                                //         task.fields = item.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7)
                                //     }
                                // })
                            }




                            if (task.maskOperation) {
                                task.text = `You are going to mask ${task.fields && task.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields in all records.`
                            } else {
                                task.text = "You are going to delete all records."
                            }
                            newArrayForDefaultTasks.push(task)
                        }
                    }
                })
            })
            let newArrayForDefaultTask = [...newArrayForDefaultTasks, ...defaultTasksState].filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName === v.entityName)) === i)

            const calculation = getPaginatedData(newArrayForDefaultTask, paginationStateCurrent.current, paginationStateCurrent.range)

            stepState === "error" && dispatch(setAllErroredTasks([...errororedState, ...newArrayForDefaultTasks]))

            dispatch(setDefaultTasks(newArrayForDefaultTask))
            dispatch(setPaginatedTasks(calculation))

            console.log(calculation, 'newArrayForDefaultTasknewArrayForDefaultTask')
            dispatch(setModalAddEntity(false))
        },
        [defaultTasksState, dispatch, errororedState, paginatedDataState, paginationStateCurrent, selectedEntites, stableDataReducer],
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

    console.log(cuttedStableData, 'cuttedStableDatacuttedStableData')



    return (
        <Modal>
            <div className="modal__header__container">
                <Header headerType='modal__header' text='Select entities from list' />
            </div>
            <div className="modal__search__container">
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4609 0.19531C11.9922 0.0651 11.5052 0 11 0C10.4948 0 10.0078 0.0651 9.5391 0.19531C9.0703 0.32552 8.6328 0.51042 8.2266 0.75C7.8203 0.98958 7.4479 1.27865 7.1094 1.61719C6.776 1.95052 6.4896 2.3203 6.25 2.7266C6.0104 3.1328 5.8255 3.5703 5.6953 4.0391C5.5651 4.5078 5.5 4.9948 5.5 5.5C5.5 6.151 5.6094 6.776 5.8281 7.375C6.0469 7.9688 6.362 8.5156 6.7734 9.0156L0.6484 15.1484C0.5495 15.2474 0.5 15.3646 0.5 15.5C0.5 15.6354 0.5495 15.7526 0.6484 15.8516C0.7474 15.9505 0.8646 16 1 16C1.1354 16 1.2526 15.9505 1.3516 15.8516L7.4844 9.7266C7.9844 10.138 8.5312 10.4531 9.125 10.6719C9.724 10.8906 10.349 11 11 11C11.5052 11 11.9922 10.9349 12.4609 10.8047C12.9297 10.6745 13.3672 10.4896 13.7734 10.25C14.1797 10.0104 14.5495 9.724 14.8828 9.3906C15.2214 9.0521 15.5104 8.6797 15.75 8.2734C15.9896 7.8672 16.1745 7.4297 16.3047 6.9609C16.4349 6.4922 16.5 6.0052 16.5 5.5C16.5 4.9948 16.4349 4.5078 16.3047 4.0391C16.1745 3.5703 15.9896 3.1328 15.75 2.7266C15.5104 2.3203 15.2214 1.95052 14.8828 1.61719C14.5495 1.27865 14.1797 0.98958 13.7734 0.75C13.3672 0.51042 12.9297 0.32552 12.4609 0.19531ZM12.75 9.6484C12.2031 9.8828 11.6198 10 11 10C10.3802 10 9.7969 9.8828 9.25 9.6484C8.7031 9.4089 8.2266 9.0859 7.8203 8.6797C7.4141 8.2734 7.0911 7.7969 6.8516 7.25C6.6172 6.7031 6.5 6.1198 6.5 5.5C6.5 4.8802 6.6172 4.2969 6.8516 3.75C7.0911 3.2031 7.4141 2.7266 7.8203 2.3203C8.2266 1.91406 8.7031 1.59375 9.25 1.35938C9.7969 1.11979 10.3802 1 11 1C11.6198 1 12.2031 1.11979 12.75 1.35938C13.2969 1.59375 13.7734 1.91406 14.1797 2.3203C14.5859 2.7266 14.9062 3.2031 15.1406 3.75C15.3802 4.2969 15.5 4.8802 15.5 5.5C15.5 6.1198 15.3802 6.7031 15.1406 7.25C14.9062 7.7969 14.5859 8.2734 14.1797 8.6797C13.7734 9.0859 13.2969 9.4089 12.75 9.6484Z" fill="#1E2432" />
                </svg>
                <input type="text" value={search} placeholder="Search" onChange={SearchInput} />
            </div>
            <div style={{ height: 250 }} className='modal__scroll__container'>
                {
                    cuttedStableData.filter((v, i, a) => a.findIndex(v2 => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i).map((item) => {
                        return <div className="modal__checkbox"><Checkbox checked={selectedEntites.some((data) => { return data.entityName === item.entityName })} value={item.entityName} onChange={(e) => { selectCheckbox(e, item) }} text={item.entityName.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))} /></div>
                    })
                }
            </div>
            <div className="modal__buttons">
                <Button onClick={closeModal} type='normal__modal' text='Cancel' />
                <Button onClick={confirm} type='normal__modal gold' text='Continue' />
            </div>
        </Modal>
    )
}

export default React.memo(RulesModalForAddEntity)