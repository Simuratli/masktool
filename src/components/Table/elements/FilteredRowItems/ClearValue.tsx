import React, { useEffect, useState } from 'react';
import { Select } from '../../../';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultTasks, setAllViewsByEntity,prepareEntitiesForDeleteItemsPutThemAll } from '../../../../redux/actions';
import { addValueForCell } from '../../../../utils/FilteredTableRowUtils';
import { ReducerType } from '../../../../redux/reducers/reducer.types';
import { updateCellItems } from '../../../../utils/run.utils'

interface RandomLinePropTypes {
    searchName: string | undefined;
    rowName: string | undefined;
    itemName: string;
    mainName: string | undefined;
    attributeTypeCode?: number;
    logicalName:string | undefined;
}


function CustomRule({ searchName, rowName, itemName, mainName, attributeTypeCode,logicalName }: RandomLinePropTypes) {
    const dispatch = useDispatch();
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const customRulesState = useSelector((state: ReducerType) => state.customRulesReducer)
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites.delete);

    const [selectValues, setselectValues] = useState(customRulesState.names)

    useEffect(() => {

        if (attributeTypeCode === 14) {
            setselectValues(previousValues => previousValues.filter((value) => value !== "BirthDay Dates"))
        }
    }, [attributeTypeCode, customRulesState])


    const selectCustomRule = (e: string | null) => {
        defaultTasksState.tasks.map((task) => {
            if (task.entityName.toLowerCase() === (mainName && mainName.toLowerCase())) {
                if (task.errorMessage) {
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
                    dispatch(setDefaultTasks(defaultTasksState.tasks))
                }
            }
        })

        viewsByEntityState.entities.map((view) => {
            if (view.name === (logicalName ? logicalName : mainName)) {
                console.log(view, 'dsfsdfsdfsdfsdfsdfsdf view')
                view.data.map((item) => {
                    if (item.name === rowName) {
                        if (item.errorMessage) {
                            item.errorMessage = null
                            item.errortext = ""
                            dispatch(setAllViewsByEntity(viewsByEntityState.entities));
                        }
                    }
                })
            }
        })

        customRulesState.rules.map(async (rule) => {
            if (rule.name === e) {
                console.log(e,'eeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
                if (e) {
                    let newData: any = addValueForCell(searchName, defaultTasksState.tasks, rowName, itemName, e, viewsByEntityState.entities,  logicalName ? logicalName : mainName, 'customrule', rule.id)
                    switch (newData.for) {
                        case 'tasks':
                            dispatch(setDefaultTasks(newData.data));
                            break;
                        case 'views':
                            dispatch(setAllViewsByEntity(newData.data));
                            let updatedCell = await updateCellItems(newData, deleteEntitiesReducer)
                            dispatch(prepareEntitiesForDeleteItemsPutThemAll(updatedCell))
                            break;
                    }
                }
            }
        })
    }

    useEffect(() => {
        // selectCustomRule(customRulesState.names[0])
    }, [])

    return (
        <Select onChange={selectCustomRule} data={selectValues} placeholder={customRulesState.names[0]} type="big" />
    )
}

export default React.memo(CustomRule)