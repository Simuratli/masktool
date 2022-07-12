import React, { useEffect } from 'react';
import { Select } from '../../../';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultTasks, setAllViewsByEntity, prepareEntitiesForDeleteItemsPutThemAll } from '../../../../redux/actions';
import { addValueForCell } from '../../../../utils/FilteredTableRowUtils';
import { ReducerType } from '../../../../redux/reducers/reducer.types';
import { updateCellItems } from '../../../../utils/run.utils'
import { helpChoseToRandomLine } from '../../TABLE__UTILS';

interface RandomLinePropTypes {
    searchName: string | undefined;
    rowName: string | undefined;
    itemName: string;
    mainName: string | undefined;
    logicalName:string | undefined;
}


function RandomLine({ searchName, rowName, itemName, mainName, logicalName }: RandomLinePropTypes) {
    const dispatch = useDispatch();
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const vocabularyListState = useSelector((state: ReducerType) => state.vocabularyListReducer)
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites.delete);



    const selectRandomLine = async (e: string | null) => {
        if (e) {

            vocabularyListState.vocabularies.map(async (vocabulary) => {
                if (e === vocabulary.displayName) {
                    let newData: any = addValueForCell(searchName, defaultTasksState.tasks, rowName, itemName, vocabulary.displayName, viewsByEntityState.entities, logicalName ? logicalName : mainName, 'randomline', vocabulary.logicalName)

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
        let selecteLine = helpChoseToRandomLine(itemName)
        // selectRandomLine(selecteLine)

        vocabularyListState.vocabularies.map(async (vocabulary) => {
            if (selecteLine === vocabulary.displayName) {
                let newData: any = addValueForCell(searchName, defaultTasksState.tasks, rowName, itemName, vocabulary.displayName, viewsByEntityState.entities, logicalName ? logicalName : mainName, 'randomline', vocabulary.logicalName)

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
    }, [])



    return (
        <Select onChange={selectRandomLine} data={vocabularyListState.names} placeholder={helpChoseToRandomLine(itemName)} type="big" />
    )
}

export default React.memo(RandomLine)