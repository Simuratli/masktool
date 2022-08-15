import React, { useCallback, useEffect } from 'react';
import { Box } from '../../../containers';
import { RadioButton, Table } from '../..';
import { MultitableContainerPropTypes } from './DropdownContent.types';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../../redux/reducers/reducer.types';
import { setAllViewsByEntity, prepareEntitiesForDelete, prepareEntitiesForDeleteItemsFromArray, setDefaultTasks, prepareEntitiesForDeleteItemsPutThemAll } from '../../../redux/actions';
import { addDeleteOrMaskIndividual } from '../../../utils/ViewsByEntityUtils';
import { prepareCells } from '../../../utils/run.utils';

function MultitableContainer({ mainName, name, fields, deleteOrMask, searchName, etc, errorText, logicalName, filter, id }: MultitableContainerPropTypes) {
    const dispatch = useDispatch()
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer)
    const stepState = useSelector((state: ReducerType) => state.stepReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks);
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites);

    useEffect(() => {
        viewsByEntityState.entities.map((view) => {
            if (view.name === (logicalName ? logicalName : mainName)) {
                view.data.map(async (item) => {
                    if (filter.includes(item.name)) {
                        if (item.maskOperation) {
                            let newCells = await prepareCells(item.cells)

                            dispatch(prepareEntitiesForDelete({
                                entityName: logicalName ? logicalName : mainName,
                                maskOperation: item.maskOperation,
                                filterViewId: item.viewId,
                                fields: newCells
                            }))
                        } else {
                            dispatch(prepareEntitiesForDelete({
                                entityName: logicalName ? logicalName : mainName,
                                maskOperation: item.maskOperation,
                                filterViewId: item.viewId,
                            }))
                        }

                    } else {
                        dispatch(prepareEntitiesForDeleteItemsFromArray(item.viewId))
                    }
                })
            }
        })

        return () => {
            viewsByEntityState.entities.map((view) => {
                if (view.name === mainName) {
                    view.data.map((item) => {
                        if (item.name === name) {
                            dispatch(prepareEntitiesForDeleteItemsFromArray(item.viewId))
                        }
                    })
                }
            })

        };

    }, [viewsByEntityState.entities.length, deleteOrMask, mainName, name, dispatch, filter])



    const handleSelectFilter = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            let newViewsByEntities = await addDeleteOrMaskIndividual(viewsByEntityState.entities, e.target.name, logicalName ? logicalName : mainName, name)
            defaultTasksState.map((task) => {
                if (task.entityName === logicalName || task.logicalName === logicalName || task.entityName === mainName) {
                    task.errorMessage = null
                    task.errortext = ''
                    if (task.filter.length !== 0) {
                        task.text = `You are going to edit fields in ${task.filter.join(', ')}`
                    } else {
                        if (task.maskOperation) {
                            task.text = `You are going to mask ${task.fields.length} fields in all records.`
                        } else {
                            task.text = `You are going to delete all records.`
                        }
                    }
                }
            })

            deleteEntitiesReducer.delete.map((item) => {
                if (item.entityName === (logicalName ? logicalName : mainName)) {
                    if (item.filterViewId === id) {
                        if (e.target.name === 'masking') {
                            item.maskOperation = true
                        } else {
                            item.maskOperation = false
                            delete item.fields
                        }
                    }

                }
            })



            dispatch(prepareEntitiesForDeleteItemsPutThemAll(deleteEntitiesReducer.delete))
            dispatch(setDefaultTasks(defaultTasksState))
            dispatch(setAllViewsByEntity(newViewsByEntities))
        },
        [viewsByEntityState.entities, logicalName, mainName, name, defaultTasksState, deleteEntitiesReducer.delete, dispatch],
    )



    return (
        <div className='multitable_container'>
            <Box type='small-multiple'>
                <div className="dropdown__box__container">
                    <div className="dropdown__box__container__main">
                        <span className="dropdown__box__container__main__text">{name}</span>
                    </div>

                    {
                        stepState.step === 'error' ? <p style={{ fontSize: 14, width: 1200 }} className='danger'>{errorText ? errorText : ''}</p> : <p></p>
                    }
                    <div className="dropdown__box__container__actions">
                        <RadioButton className='small' name="delete" color="green" checked={typeof deleteOrMask === "boolean" && !deleteOrMask} onChange={handleSelectFilter} label={"Delete"} />
                        <RadioButton className='small' name="masking" color="green" checked={typeof deleteOrMask === "boolean" && deleteOrMask} onChange={handleSelectFilter} label={"Masking"} />
                    </div>
                </div>
            </Box>
            {
                typeof deleteOrMask === "boolean" && deleteOrMask && <Table logicalName={logicalName} etc={etc} name={name} mainName={mainName} searchName={searchName} fields={fields} />
            }

        </div>
    )
}

export default MultitableContainer