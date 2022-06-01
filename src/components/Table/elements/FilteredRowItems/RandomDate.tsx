import React, { useState, useEffect } from 'react';
import { Calendar } from '../../../';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultTasks, setAllViewsByEntity,prepareEntitiesForDeleteItemsPutThemAll } from '../../../../redux/actions';
import { addValueForCell } from '../../../../utils/FilteredTableRowUtils';
import { DDMMYYYY } from '../../../../utils/dateTimeUtil';
import { ReducerType } from '../../../../redux/reducers/reducer.types';
import { updateCellItems } from '../../../../utils/run.utils'

interface RandomDatePropTypes {
    searchName: string | undefined;
    rowName: string | undefined;
    itemName: string;
    mainName: string | undefined;
}


function RandomDate({ searchName, rowName, itemName, mainName }: RandomDatePropTypes) {
    const dispatch = useDispatch();
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites.delete);

    const [date, setDate] = useState(
        [
            {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
            }
        ]
    )




    let onChangeDate = async (item: any) => {
        let selection = item.selection;

        let newData: any = addValueForCell(searchName, defaultTasksState.tasks, rowName, itemName, `${DDMMYYYY(selection.startDate)}-${DDMMYYYY(selection.endDate)}`, viewsByEntityState.entities, mainName, 'date', selection.startDate, selection.endDate)

        switch (newData.for) {
            case 'tasks':
                dispatch(setDefaultTasks(newData.data));
                break;
            case 'views':
                dispatch(setAllViewsByEntity(newData.data));
                let updatedCell = await updateCellItems(newData,deleteEntitiesReducer)
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