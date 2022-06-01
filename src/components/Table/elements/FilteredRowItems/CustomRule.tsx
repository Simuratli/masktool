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
    attributeTypeCode?: number
}


function CustomRule({ searchName, rowName, itemName, mainName, attributeTypeCode }: RandomLinePropTypes) {
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
            }else{
                setselectValues(customRulesState.names)
            }


        })

        if (attributeTypeCode === 14) {
            setselectValues(previousValues => previousValues.filter((value) => value !== "BirthDay Dates"))

        }
    }, [attributeTypeCode, customRulesState])


    const selectCustomRule = (e: string | null) => {

        customRulesState.rules.map(async (rule) => {
            if (rule.name === e) {
                if (e) {
                    let newData: any = addValueForCell(searchName, defaultTasksState.tasks, rowName, itemName, e, viewsByEntityState.entities, mainName, 'customrule', rule.id)

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
        selectCustomRule(selectValues[0])
    }, [])

    return (
        <Select onChange={selectCustomRule} data={selectValues} placeholder={selectValues[0]} type="big" />
    )
}

export default React.memo(CustomRule)