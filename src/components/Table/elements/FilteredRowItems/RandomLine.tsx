import React, { useEffect } from 'react';
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
}


function RandomLine({ searchName, rowName, itemName, mainName }: RandomLinePropTypes) {
    const dispatch = useDispatch();
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const vocabularyListState = useSelector((state: ReducerType) => state.vocabularyListReducer)
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites.delete);



    const selectRandomLine = async (e: string | null) => {
        if (e) {

            vocabularyListState.vocabularies.map(async (vocabulary) => {
                if (e === vocabulary.displayName) {
                    let newData: any = addValueForCell(searchName, defaultTasksState.tasks, rowName, itemName, vocabulary.displayName, viewsByEntityState.entities, mainName, 'randomline', vocabulary.logicalName)

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
            })


        }
    }

    useEffect(() => {
        selectRandomLine(vocabularyListState.names[0])
    }, [])



    return (
        <Select onChange={selectRandomLine} data={vocabularyListState.names} placeholder={vocabularyListState.names[0]} type="big" />
    )
}

export default React.memo(RandomLine)