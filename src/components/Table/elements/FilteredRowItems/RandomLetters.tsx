import React, { useState, useEffect } from 'react';
import { Input } from '../../../';
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
    max: number;
    parameter: string[];
    logicalName: string | undefined;
}


function RandomLetters({ searchName, rowName, itemName, mainName, max, parameter, logicalName }: RandomLinePropTypes) {
    const dispatch = useDispatch();
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const [inputValue, setinputValue] = useState((max === 52 ? '15' : '8'))
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites.delete);
    const [error, seterror] = useState(false)

    const onChangeText = async (e: React.ChangeEvent<HTMLInputElement>) => {

        let newTargetValue = e.target.value.slice(0, max)

        if (Number(e.target.value) > Number(max) || Number(e.target.value) < 2) {
            seterror(true)
        } else {
            seterror(false)
        }

        setinputValue(newTargetValue)

        let newData: any = addValueForCell(searchName, defaultTasksState.tasks, rowName, itemName, newTargetValue, viewsByEntityState.entities, logicalName ? logicalName : mainName, 'letters')

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
        let newData: any = addValueForCell(searchName, defaultTasksState.tasks, rowName, itemName, (max === 52 ? '15' : '8'), viewsByEntityState.entities, logicalName ? logicalName : mainName, 'letters')
        switch (newData.for) {
            case 'tasks':
                dispatch(setDefaultTasks(newData.data));
                break;
            case 'views':
                dispatch(setAllViewsByEntity(newData.data));
                updateCellItems(newData, deleteEntitiesReducer).then((updatedCell) => { dispatch(prepareEntitiesForDeleteItemsPutThemAll(updatedCell)) })
                break;
        }
    }, [])


    let onBlurCapture = () => {
        if (Number(inputValue) < 2) {
            setinputValue('2')
           
            let newData: any = addValueForCell(searchName, defaultTasksState.tasks, rowName, itemName, '2', viewsByEntityState.entities, logicalName ? logicalName : mainName, 'letters')
            switch (newData.for) {
                case 'tasks':
                    dispatch(setDefaultTasks(newData.data));
                    break;
                case 'views':
                    dispatch(setAllViewsByEntity(newData.data));
                    updateCellItems(newData, deleteEntitiesReducer).then((updatedCell) => { dispatch(prepareEntitiesForDeleteItemsPutThemAll(updatedCell)) })
                    break;
            }
            seterror(false)
        }

        if (Number(inputValue) > max) {
            setinputValue(max.toString())
           
            let newData: any = addValueForCell(searchName, defaultTasksState.tasks, rowName, itemName, max.toString(), viewsByEntityState.entities, logicalName ? logicalName : mainName, 'letters')
            switch (newData.for) {
                case 'tasks':
                    dispatch(setDefaultTasks(newData.data));
                    break;
                case 'views':
                    dispatch(setAllViewsByEntity(newData.data));
                    updateCellItems(newData, deleteEntitiesReducer).then((updatedCell) => { dispatch(prepareEntitiesForDeleteItemsPutThemAll(updatedCell)) })
                    break;
            }
            seterror(false)
        }
    }

    return (
        <Input onBlurCapture={onBlurCapture} className={`filtered ${error && "error"}`} value={inputValue} onChange={onChangeText} max={max} placeholder={`2-${max}`} name="Name" type="number" />
    )
}

export default RandomLetters