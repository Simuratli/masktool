import React, { useEffect } from 'react';
import { Select } from '../../../';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultTasks, setAllViewsByEntity, prepareEntitiesForDeleteItemsPutThemAll } from '../../../../redux/actions';
import { addValueForCell } from '../../../../utils/FilteredTableRowUtils';
import { ReducerType } from '../../../../redux/reducers/reducer.types';
import { updateCellItems } from '../../../../utils/run.utils'
import { helpChoseToRandomLine, helpChoseToRandomLineReverse } from '../../TABLE__UTILS';

interface RandomLinePropTypes {
    searchName: string | undefined;
    rowName: string | undefined;
    itemName: string;
    mainName: string | undefined;
    logicalName: string | undefined;
    parameter: string[]
}


function RandomLine({ searchName, rowName, itemName, mainName, logicalName, parameter }: RandomLinePropTypes) {
    const dispatch = useDispatch();
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const vocabularyListState = useSelector((state: ReducerType) => state.vocabularyListReducer)
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites.delete);

    

    const selectRandomLine = async (e: string | null) => {

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

    console.log(viewsByEntityState,'niyecealie')

    useEffect(() => {

        let selecteLine = helpChoseToRandomLineReverse(parameter[0], vocabularyListState.vocabularies)
       
        if (parameter.length !== 0) {
            if (!parameter[0].includes('.BDM')) {
                selecteLine = helpChoseToRandomLine(itemName, vocabularyListState.vocabularies)
            }else{
               selecteLine = helpChoseToRandomLineReverse(parameter[0], vocabularyListState.vocabularies)
            }
        } else {
            selecteLine = helpChoseToRandomLine(itemName, vocabularyListState.vocabularies)
        }
        // selectRandomLine(selecteLine)

        vocabularyListState.vocabularies.map(async (vocabulary) => {
            
            if (selecteLine === vocabulary.displayName) {
                console.log(selecteLine,vocabulary.displayName,'checkequearl')

                let val = vocabulary.logicalName

                if (parameter.length !== 0) {
                    if (parameter[0].includes('.BDM')) {
                        val = parameter[0]
                    }else{
                        val = vocabulary.logicalName
                       selecteLine = helpChoseToRandomLineReverse(parameter[0], vocabularyListState.vocabularies)
                    }
                } else {
                    val = vocabulary.logicalName
                }


                let newData: any = addValueForCell(searchName, defaultTasksState.tasks, rowName, itemName, vocabulary.displayName, viewsByEntityState.entities, logicalName ? logicalName : mainName, 'randomline', val)

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
        <Select list onChange={selectRandomLine} data={vocabularyListState.names} placeholder={parameter.length !== 0 ? (!parameter[0].includes('.BDM') ? helpChoseToRandomLine(itemName, vocabularyListState.vocabularies) : helpChoseToRandomLineReverse(parameter[0], vocabularyListState.vocabularies)) : helpChoseToRandomLine(itemName, vocabularyListState.vocabularies)} type="big" />
    )
}

export default React.memo(RandomLine)