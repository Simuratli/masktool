import React, { useState, useEffect } from 'react';
import { Input } from '../../../';
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
}


function RandomLetters({ searchName, rowName, itemName, mainName }: RandomLinePropTypes) {
    const dispatch = useDispatch();
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const [inputValue, setinputValue] = useState('')
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites.delete);


    const onChangeText = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setinputValue((prev) => e.target.value.slice(0, 8))
        let newData: any = addValueForCell(searchName, defaultTasksState.tasks, rowName, itemName, e.target.value.slice(0, 8), viewsByEntityState.entities, mainName, 'letters')

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

    useEffect(() => {
        let newData: any = addValueForCell(searchName, defaultTasksState.tasks, rowName, itemName, "", viewsByEntityState.entities, mainName, 'letters')

        switch (newData.for) {
            case 'tasks':
                dispatch(setDefaultTasks(newData.data));
                break;
            case 'views':
                dispatch(setAllViewsByEntity(newData.data));
                updateCellItems(newData, deleteEntitiesReducer).then((updatedCell)=>{dispatch(prepareEntitiesForDeleteItemsPutThemAll(updatedCell))})
                break;
        }
    }, [])



    return (
        <Input value={inputValue} onChange={onChangeText} max={8} className='filtered' placeholder="Count of symbols" name="Name" type="number" />
    )
}

export default React.memo(RandomLetters)