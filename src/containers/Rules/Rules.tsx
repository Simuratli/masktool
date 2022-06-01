import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Dropdown } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { setModalToggleActions, setStep, setCurrentRequest, setProgressAdd, setDefaultTasks } from '../../redux/actions';
import { ClearTasks, GetTasksStatus, CreateTask } from '../../api'
import { RulesHeader, RulesFooter } from './RulesElements'
import Box from '../Box';
import { getPaginatedData } from '../../utils/pagiantionUtil';
import { setPaginatedTasks } from '../../redux/actions';
import RulesModalForDelete from './RulesModalForDelete'
import RulesModalForRun from './RulesModalForRun'
import RulesModalForAddEntity from './RulesElements/RulesModalForAddEntity'
import TableModalForFields from '../../components/Table/elements/TableModalForFields'
import { prepareIndividualForDelete } from '../../utils/run.utils'
let number = 0
let numberforSuccess = 0
function Rules() {
    const dispatch = useDispatch();
    const modalState = useSelector((state: ReducerType) => state.modalReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const paginationState = useSelector((state: ReducerType) => state.paginationReducer);
    const paginatedData = useSelector((state: ReducerType) => state.paginatedTasksdReducer);
    const calculation = useMemo(() => getPaginatedData(defaultTasksState.tasks, paginationState.current, paginationState.range), [paginationState.current, paginationState.range, defaultTasksState]);
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites.delete);
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);

    const [deneme, setDeneme] = useState<any>([])


    useEffect(() => {
        dispatch(setPaginatedTasks(calculation))
    }, [calculation])


    return (
        <div className='rules'>
            <Box>
                <RulesHeader />
                {
                    paginatedData.paginated.length !== 0 && paginatedData.paginated.map((task) => {
                        return <Dropdown
                            progress={task.progress}
                            requestResult={task.requestResult}
                            success={task.errorMessage}
                            name={task.entityName}
                            etc={task.etc}
                            fields={task.fields}
                            deleteOrMask={task.maskOperation}
                            actions={task.text}
                            filter={task.filter}
                            totalRecords={task.totalRecords}
                            successRecords={task.successRecords}
                        />
                    })
                }
                <RulesFooter />
            </Box>

            {modalState.open && <RulesModalForDelete />}

            {modalState.runActionOpen && <RulesModalForRun />}
            {modalState.addEntity && <RulesModalForAddEntity />}
            {modalState.addFields && <TableModalForFields />}
        </div>
    )
}

export default React.memo(Rules)