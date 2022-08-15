import React, { useState, useEffect } from 'react';
import { Calendar } from '../../../';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultTasks, setAllViewsByEntity, prepareEntitiesForDeleteItemsPutThemAll } from '../../../../redux/actions';
import { addValueForCell } from '../../../../utils/FilteredTableRowUtils';
import { DDMMYYYY } from '../../../../utils/dateTimeUtil';
import { ReducerType } from '../../../../redux/reducers/reducer.types';
import { updateCellItems } from '../../../../utils/run.utils'

interface RandomDatePropTypes {
    searchName: string | undefined;
    rowName: string | undefined;
    itemName: string;
    mainName: string | undefined;
    logicalName: string | undefined;
    parameter: string[]
}

function getSameDayOfYear(date: any, yearsToAdd: any) {
    date = typeof (date) === "string" ? new Date(date) : date;
    var retDate = new Date(+date);
    retDate.setFullYear(retDate.getFullYear() + yearsToAdd);

    var diff = date.getDay() - retDate.getDay();
    if (diff < -4) {
        diff = diff + 7; //go forward instead of backward
    }

    retDate.setDate(retDate.getDate() + diff);
    return retDate;
}


function RandomDate({ searchName, rowName, itemName, mainName, logicalName, parameter }: RandomDatePropTypes) {
    const dispatch = useDispatch();
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites.delete);
    const d = new Date();
    d.setFullYear(d.getFullYear() - 1);

    const [date, setDate] = useState(
        [
            {
                startDate: new Date(getSameDayOfYear(new Date(), -1)),
                endDate: new Date(),
                key: 'selection',
            }
        ]
    )




    let onChangeDate = async (item: any) => {

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

        let selection = item.selection;

        let newData: any = addValueForCell(searchName, defaultTasksState.tasks, rowName, itemName, `${DDMMYYYY(selection.startDate)}-${DDMMYYYY(selection.endDate)}`, viewsByEntityState.entities, logicalName ? logicalName : mainName, 'date', selection.startDate, selection.endDate)

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

        setDate([selection]);
    }


    useEffect(() => {

        let selectData = { selection: date[0] }
        console.log(parameter, 'salammsdaopa')
        if (parameter) {
            if (parameter.length === 2) {
                let dateStart = new Date(parameter[0])
                let dateEnd = new Date(parameter[1])
                let newObjSelect = {
                    startDate: dateStart,
                    endDate: dateEnd,
                    key: 'selection',
                }

                selectData = {
                    selection: newObjSelect
                }
            }
        }

        let selection: any = selectData.selection;

        let newData: any = addValueForCell(searchName, defaultTasksState.tasks, rowName, itemName, `${DDMMYYYY(selection.startDate)}-${DDMMYYYY(selection.endDate)}`, viewsByEntityState.entities, logicalName ? logicalName : mainName, 'date', selection.startDate, selection.endDate)

        switch (newData.for) {
            case 'tasks':
                dispatch(setDefaultTasks(newData.data));
                break;
            case 'views':
                dispatch(setAllViewsByEntity(newData.data));
                updateCellItems(newData, deleteEntitiesReducer)
                    .then((updatedCell) => {
                        dispatch(prepareEntitiesForDeleteItemsPutThemAll(updatedCell))
                    })

                break;
        }

        setDate([selection]);

        // onChangeDate(selectData)
    }, [])


    return (
        <Calendar setDate={setDate} date={date} onChange={onChangeDate} />
    )
}

export default React.memo(RandomDate)