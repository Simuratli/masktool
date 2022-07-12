import React, { useEffect } from 'react';
import { Dropdown } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { setViewsByEntity } from '../../redux/actions';
import { GetViewsByEntity } from '../../api'
import { RulesHeader, RulesFooter } from './RulesElements'
import Box from '../Box';
import { getPaginatedData } from '../../utils/pagiantionUtil';
import { setPaginatedTasks } from '../../redux/actions';
import RulesModalForDelete from './RulesModalForDelete'
import RulesModalForRun from './RulesModalForRun'
import RulesModalForAddEntity from './RulesElements/RulesModalForAddEntity'
import TableModalForFields from '../../components/Table/elements/TableModalForFields'
import NonEntites from '../../components/NonEntites'

function Rules() {
    const dispatch = useDispatch();
    const modalState = useSelector((state: ReducerType) => state.modalReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const paginationState = useSelector((state: ReducerType) => state.paginationReducer);
    const paginatedData = useSelector((state: ReducerType) => state.paginatedTasksdReducer);
    const erroredState = useSelector((state: ReducerType) => state.erroredTaskReducer);
    const stepState = useSelector((state: ReducerType) => state.stepReducer);
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer)
    const loading = useSelector((state: ReducerType) => state.loaderReducer.loading)

    useEffect(() => {
        const calculation = getPaginatedData(defaultTasksState.tasks, paginationState.current, paginationState.range)
        dispatch(setPaginatedTasks(calculation))
    }, [defaultTasksState.tasks.length, paginationState.current, paginationState.range])


    useEffect(() => {
        paginatedData.paginated.map(async (item) => {



            if (viewsByEntityState.entities.some((value) => value.name === item.entityName || value.name === item.logicalName) === false) {

                let viewsByEntity = await GetViewsByEntity(item.logicalName ? item.logicalName : item.entityName, item.etc);

                viewsByEntity.map((view: any) => {
                    view.maskOperation = item.maskOperation
                    view.cells.map((v: any) => {
                        item.fields.map((x) => {
                            if (x.logicalName === v.logicalName) {
                                v.requiredLevel = x.requiredLevel
                            }
                        })
                    })
                })


                dispatch(setViewsByEntity({ name: item.logicalName ? item.logicalName : item.entityName, data: viewsByEntity }))

            }
        })
    }, [dispatch, paginatedData.paginated, paginatedData.paginated.length])

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
                            actions={task.text ? task.text : 'Delete'}
                            filter={task.filter}
                            totalRecords={task.totalRecords}
                            successRecords={task.successRecords}
                            errorText={task.errortext}
                            records={task.records}
                            logicalName={task.logicalName}
                            open={task.open}
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
                            actions={task.text ? task.text : 'Delete'}
                            filter={task.filter}
                            totalRecords={task.totalRecords}
                            successRecords={task.successRecords}
                            errorText={task.errortext}
                            records={task.records}
                            logicalName={task.logicalName}
                            open={task.open}
                        />
                    }))
                }

                {
                    !loading && paginatedData.paginated.length === 0 && <NonEntites />
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