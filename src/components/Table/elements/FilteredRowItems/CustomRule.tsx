import React, { useEffect, useState } from 'react';
import { Select } from '../../../';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultTasks, setAllViewsByEntity, prepareEntitiesForDeleteItemsPutThemAll } from '../../../../redux/actions';
import { addValueForCell } from '../../../../utils/FilteredTableRowUtils';
import { ReducerType } from '../../../../redux/reducers/reducer.types';
import { updateCellItems } from '../../../../utils/run.utils'

interface RandomLinePropTypes {
    searchName: string | undefined;
    rowName: string | undefined;
    itemName: string;
    mainName: string | undefined;
    attributeTypeCode?: number;
    logicalName: string | undefined;
    parameter: string[]
}


function CustomRule({ searchName, rowName, itemName, mainName, attributeTypeCode, logicalName, parameter }: RandomLinePropTypes) {
    const dispatch = useDispatch();
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const customRulesState = useSelector((state: ReducerType) => state.customRulesReducer)
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites.delete);


    const [selectValues, setselectValues] = useState(customRulesState.names)

    useEffect(() => {

        customRulesState.categorized.map((rule) => {
            if (attributeTypeCode === 14) {
                if (rule.name === "Line") {
                    setselectValues(rule.data)
                }
            } else if (attributeTypeCode === 7) {
                if (rule.name === "Multi line") {
                    setselectValues(rule.data)
                }
            }
            else if (attributeTypeCode === 2) {
                if (rule.name === "Date Type") {
                    setselectValues(rule.data)
                }
            } else {
                setselectValues(customRulesState.names)
            }
        })


    }, [attributeTypeCode, customRulesState])



    const update = (e:any) => {
        customRulesState.rules.map(async (rule) => {
            if (rule.name === e) {
                if (e) {
                    let newData: any = addValueForCell(searchName, defaultTasksState.tasks, rowName, itemName, e, viewsByEntityState.entities, logicalName ? logicalName : mainName, 'customrule', rule.id)

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




    const selectCustomRule = (e: string | null) => {

        defaultTasksState.tasks.map((task) => {
            if (task.entityName.toLowerCase() === (mainName && mainName.toLowerCase()) || task.entityName.toLowerCase() === (logicalName && logicalName.toLowerCase())) {
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

        update(e)
    }


    // if (itemName === 'Address 2: ZIP/Postal Code') {
    //     console.log(parameter, 'paramet', itemName)
    // }


    useEffect(() => {
        if (parameter && parameter.length !== 0) {

            if (!parameter[0].includes('.BDM') || typeof Number(parameter[0]) !== 'number') {
                customRulesState.rules.map((item) => {
                    if (item.id === parameter[0]) {
                        update(item.name)
                    } else {
                        update(selectValues[0])
                    }
                })
            } else {
                update(selectValues[0])
            }
        } else {
            update(selectValues[0])
        }

    }, [])


    const returnName = (id: any) => {

        let data = selectValues[0]
        customRulesState.rules.map((item) => item.id === parameter[0] && item.name)
        customRulesState.rules.map((item) => {
            if (item.id === id) {
                data = item.name
            }
        })

        return data
    }

    return (
        <Select onChange={selectCustomRule} data={selectValues} placeholder={parameter && parameter.length !== 0 ? (!parameter[0].includes('.BDM') || typeof Number(parameter[0]) !== 'number' ? returnName(parameter[0]) : selectValues[0]) : selectValues[0]} type="big" />
    )
}

export default React.memo(CustomRule)