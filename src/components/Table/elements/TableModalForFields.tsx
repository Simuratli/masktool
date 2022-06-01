import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Modal, Button, Header, Checkbox } from '../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../../redux/reducers/reducer.types';
import { setModaleActionsAllow, setStableEntityByViews, setAllViewsByEntity, setDefaultTasks, setStableDefaultTasks, setModalDeleted, setToggleModal, setModalAddEntity, setModalAddField } from '../../../redux/actions'
import Loader from '../../Loader'

function TableModalForFields() {
    const dispatch = useDispatch();
    const stableDataReducer = useSelector((state: ReducerType) => state.stableDataReducer)
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer)
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer)
    const [dataFields, setdataFields] = useState<any[]>([])
    const [selectedFields, setselectedFields] = useState<any[]>([])


    // console.log('res seee', selectedFields)

    const confirm = useCallback(
        () => {
            let newArrayForAddedFields: any = [];

            if (stableDataReducer.searchName === "entities") {

                defaultTasksState.tasks.map((item) => {
                    if (item.entityName === stableDataReducer.name) {

                        const res1 = selectedFields.filter((page1) => !item.fields.find(page2 => page1.logicalName === page2.logicalName))
                        console.log(item.fields, ' item.fieldss res1')
                        console.log(res1, 'res1 res1')
                        item.fields = [...item.fields, ...res1]

                    }

                })
                dispatch(setDefaultTasks(defaultTasksState.tasks))
            } else {
                viewsByEntityState.entities.map((view) => {
                    if (view.name === stableDataReducer.mainName) {

                        view.data.map((item) => {
                            if (item.name === stableDataReducer.name) {
                                console.log('i am working', selectedFields)
                                const res1 = selectedFields.filter((page1) => !item.cells.find(page2 => page1.logicalName === page2.logicalName))
                                console.log(item.cells, 'item.cells res1')
                                console.log(res1, 'res1 res1')

                                item.cells = [...item.cells, ...res1]
                            }
                        })

                    }
                })
                dispatch(setAllViewsByEntity(viewsByEntityState.entities))
            }

            dispatch(setModalAddField(false))
        },
        [selectedFields, stableDataReducer, defaultTasksState, viewsByEntityState],
    )





    useEffect(() => {
        if (stableDataReducer.searchName === 'entities') {
            stableDataReducer.tasks.map((data) => {
                if (data.entityName === stableDataReducer.name) {
                    console.log('salam', data)
                    setdataFields(data.fields)
                }
            })
        } else {
            console.log(stableDataReducer.entities, ' stableDataReducer.entites')
            stableDataReducer.entities.map((entity) => {
                if (entity.name === stableDataReducer.mainName) {
                    entity.data.map((item) => {
                        if (item.name === stableDataReducer.name) {
                            setdataFields(item.cells)
                        }
                    })
                }
            })
        }

        console.log('salammmm')
    }, [stableDataReducer.tasks])



    const closeModal = () => {
        dispatch(setToggleModal(false))
        dispatch(setModalDeleted(false))
        dispatch(setModaleActionsAllow(false))
        dispatch(setModalAddField(false))
        dispatch(setModalAddEntity(false))
    }


    const choseCheckbox = (e: React.ChangeEvent<HTMLInputElement>, item: any) => {
        console.log("gellllllll res", item)
        if (e.target.checked) {

            setselectedFields((prev) => [...prev, item])

        } else if (!e.target.checked) {
            setselectedFields((prev) => prev.filter((value) => value.logicalName !== e.target.value))

        }


    }



    return (
        <Modal>
            <div className="modal__header__container">
                <Header headerType='modal__header' text='Select entities from list' />
            </div>
            <div className='modal__scroll__container'>
                {
                    dataFields.map((item: any) => {
                        return <div className="modal__checkbox"><Checkbox value={item.logicalName} onChange={(e) => choseCheckbox(e, item)} text={item.displayName ? item.displayName : item.logicalName} /></div>
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

export default TableModalForFields