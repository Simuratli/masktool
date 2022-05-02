import React, { useState } from 'react';
import { Input } from '../../../';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultTasks, setAllViewsByEntity } from '../../../../redux/actions';
import { addValueForCell } from '../../../../utils/FilteredTableRowUtils';
import { ReducerType } from '../../../../redux/reducers/reducer.types';

interface RandomLinePropTypes {
    searchName: string | undefined;
    rowName: string | undefined;
    itemName: string;
    mainName: string | undefined;
}


function RandomLetters({ searchName, rowName, itemName, mainName }: RandomLinePropTypes) {
    const dispatch = useDispatch();
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const [inputValue, setinputValue] = useState('')



    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setinputValue((prev) => e.target.value.slice(0, 8))
        let newData:any = addValueForCell(searchName, defaultTasksState.tasks, rowName, itemName, e.target.value.slice(0, 8), viewsByEntityState.entities, mainName)

        switch (newData.for) {
            case 'tasks':
                dispatch(setDefaultTasks(newData.data));
                break;
            case 'views':
                dispatch(setAllViewsByEntity(newData.data));
                break;
        }
    }


    return (
        <Input value={inputValue} onChange={onChangeText} max={8} className='filtered' placeholder="8 symbols" name="Name" type="number" />
    )
}

export default React.memo(RandomLetters)