import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Dropdown } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { setModalToggleActions, setStep, setCurrentRequest, setProgressAdd, setDefaultTasks, setViewsByEntity } from '../../redux/actions';
import { ClearTasks, GetTasksStatus, CreateTask, GetViewsByEntity } from '../../api'
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
    // const calculation = useMemo(() => getPaginatedData(defaultTasksState.tasks, paginationState.current, paginationState.range), [defaultTasksState, paginationState]);
    const erroredState = useSelector((state: ReducerType) => state.erroredTaskReducer);
    const stepState = useSelector((state: ReducerType) => state.stepReducer);

    useEffect(() => {
        const calculation = getPaginatedData(defaultTasksState.tasks, paginationState.current, paginationState.range)
        dispatch(setPaginatedTasks(calculation))
    }, [defaultTasksState.tasks.length, paginationState.current, paginationState.range])


    useEffect(() => {
        console.log("salammmmmmmmm")
        paginatedData.paginated.map(async (item) => {
            console.log(item, 'salmmm')
            let viewsByEntity = await GetViewsByEntity(item.logicalName ? item.logicalName : item.entityName, item.etc);
            console.log(viewsByEntity, 'viewsByEntity')
            dispatch(setViewsByEntity({ name: item.entityName, data: viewsByEntity }))
        })
    }, [paginatedData.paginated.length])


    return (
        <div className='rules'>
            <Box>
                <RulesHeader />
                {
                    paginatedData.paginated.length !== 0 && (stepState.step === "error" ? erroredState.tasks.map((task) => {
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
                    }) : paginatedData.paginated.map((task) => {
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
                    }))
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