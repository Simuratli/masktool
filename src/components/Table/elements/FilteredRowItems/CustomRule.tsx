import React, { useEffect, useState } from 'react';
import { Select } from '../../../';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultTasks, setAllViewsByEntity } from '../../../../redux/actions';
import { addValueForCell } from '../../../../utils/FilteredTableRowUtils';
import { ReducerType } from '../../../../redux/reducers/reducer.types';

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

    const [selectValues, setselectValues] = useState(customRulesState.names)

    useEffect(() => {

        if (attributeTypeCode === 14) {
            setselectValues(previousValues => previousValues.filter((value) => value !== "BirthDay Dates"))
        }
    }, [attributeTypeCode, customRulesState])


    const selectCustomRule = (e: string | null) => {
        if (e) {
            let newData: any = addValueForCell(searchName, defaultTasksState.tasks, rowName, itemName, e, viewsByEntityState.entities, mainName)

            switch (newData.for) {
                case 'tasks':
                    dispatch(setDefaultTasks(newData.data));
                    break;
                case 'views':
                    dispatch(setAllViewsByEntity(newData.data));
                    break;
            }
        }
    }

    useEffect(() => {
        selectCustomRule(customRulesState.names[0])
    }, [])

    return (
        <Select onChange={selectCustomRule} data={selectValues} placeholder={customRulesState.names[0]} type="big" />
    )
}

export default React.memo(CustomRule)