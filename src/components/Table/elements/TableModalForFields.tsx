import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Modal, Button, Header, Checkbox } from '../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../../redux/reducers/reducer.types';
import { setModaleActionsAllow, setStableEntityByViews, setAllViewsByEntity, setDefaultTasks, setStableDefaultTasks, setModalDeleted, setToggleModal, setModalAddEntity, setModalAddField } from '../../../redux/actions'
import { GetAttributesByEntity } from '../../../api';

function getDifference(array1: any[], array2: any[]) {
    return array1.filter(object1 => {
        return !array2.some(object2 => {
            return object1.logicalName === object2.logicalName;
        });
    });
}

function TableModalForFields() {
    const dispatch = useDispatch();
    const stableDataReducer = useSelector((state: ReducerType) => state.stableDataReducer)
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer)
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer)
    const [dataFields, setdataFields] = useState<any[]>([])
    const [selectedFields, setselectedFields] = useState<any[]>([])
    const getEntitiesState = useSelector((state: ReducerType) => state.getEntitiesReducer.entities)




    const confirm = useCallback(
        () => {
            let newArrayForAddedFields: any = [];

            if (stableDataReducer.searchName === "entities") {

                defaultTasksState.tasks.map((item) => {
                    if (item.entityName === stableDataReducer.name) {

                        const res1 = selectedFields.filter((page1) => !item.fields.find(page2 => page1.logicalName === page2.logicalName))
                        item.fields = [...item.fields, ...res1]

                    }

                })
                dispatch(setDefaultTasks(defaultTasksState.tasks))
            } else {
                viewsByEntityState.entities.map((view) => {
                    if (view.name === stableDataReducer.mainName) {

                        view.data.map((item) => {
                            if (item.name === stableDataReducer.name) {
                                const res1 = selectedFields.filter((page1) => !item.cells.find(page2 => page1.logicalName === page2.logicalName))
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
                    GetAttributesByEntity(data.entityName, data.etc).then((attr) => {
                        let newDataOfArray = [...data.fields, ...attr]

                        var index = defaultTasksState.tasks.findIndex(function (item, i) {
                            return item.entityName === stableDataReducer.name
                        });
                        let dataNew = getDifference(newDataOfArray, defaultTasksState.tasks[index].fields)
                        setdataFields(dataNew)
                    })


                }
            })
        } else {
            stableDataReducer.entities.map((entity) => {
                if (entity.name === stableDataReducer.name) {
                    var index = viewsByEntityState.entities.findIndex(function (item, i) {
                        return item.name === stableDataReducer.mainName
                    });

                    let secondIndex = viewsByEntityState.entities[index].data.findIndex(function (item, i) {
                        return item.name === stableDataReducer.name
                    });
                    let dataNew = getDifference(entity.data, viewsByEntityState.entities[index].data[secondIndex].cells)
                    let newDataOfArray = [...entity.data]
                    setdataFields(dataNew)
                }
            })
        }

    }, [defaultTasksState.tasks, stableDataReducer])



    const closeModal = () => {
        dispatch(setToggleModal(false))
        dispatch(setModalDeleted(false))
        dispatch(setModaleActionsAllow(false))
        dispatch(setModalAddField(false))
        dispatch(setModalAddEntity(false))
    }


    const choseCheckbox = (e: React.ChangeEvent<HTMLInputElement>, item: any) => {
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