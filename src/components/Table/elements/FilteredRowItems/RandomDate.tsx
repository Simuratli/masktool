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
}

function getSameDayOfYear(date:any, yearsToAdd:any){
    date = typeof(date) === "string" ? new Date(date) : date;
    var retDate = new Date(+date);
    retDate.setFullYear(retDate.getFullYear() + yearsToAdd);
    
    var diff = date.getDay() - retDate.getDay();
    if(diff < -4){
      diff = diff + 7; //go forward instead of backward
    }
  
    retDate.setDate(retDate.getDate() + diff);
    return retDate;
  }
  

function RandomDate({ searchName, rowName, itemName, mainName, logicalName }: RandomDatePropTypes) {
    const dispatch = useDispatch();
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites.delete);
    const d = new Date();
    d.setFullYear(d.getFullYear() - 1);

    const [date, setDate] = useState(
        [
            {
                startDate: new Date(getSameDayOfYear(new Date() , -1)),
                endDate: new Date(),
                key: 'selection',
            }
        ]
    )




    let onChangeDate = async (item: any) => {
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
        onChangeDate({ selection: date[0] })
    }, [])


    return (
        <Calendar setDate={setDate} date={date} onChange={onChangeDate} />
    )
}

export default React.memo(RandomDate)