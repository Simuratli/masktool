import React, { useEffect } from 'react';
import { Dropdown } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { setViewsByEntity, setStableEntityByViews } from '../../redux/actions';
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
import { Header } from '../../components'

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
    const searchState = useSelector((state: ReducerType) => state.searchReducer.search)
    const stableDataReducer = useSelector((state: ReducerType) => state.stableDataReducer)

    useEffect(() => {
        const calculation = getPaginatedData(defaultTasksState.tasks, paginationState.current, paginationState.range)
        dispatch(setPaginatedTasks(calculation))
    }, [defaultTasksState.tasks.length, paginationState.current, paginationState.range])


    useEffect(() => {
        paginatedData.paginated.map(async (item) => {



            if (stableDataReducer.entities.some((value) => value.name === item.entityName || value.name === item.logicalName) === false) {

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

                console.log('sealammmmm', { name: item.logicalName ? item.logicalName : item.entityName, data: viewsByEntity })
                if (viewsByEntityState.entities.some((value) => value.name === item.entityName || value.name === item.logicalName) === false) {
                    dispatch(setViewsByEntity({ name: item.logicalName ? item.logicalName : item.entityName, data: viewsByEntity }))
                }

                if (stableDataReducer.entities.some((value) => value.name === item.entityName || value.name === item.logicalName) === false) {
                    dispatch(setStableEntityByViews({ name: item.logicalName ? item.logicalName : item.entityName, data: viewsByEntity }))
                }

                
            }
        })
    }, [dispatch, paginatedData.paginated, paginatedData.paginated.length,])

    return (
        <div className='rules'>
            <Box>
                {
                    defaultTasksState.tasks.length === 0 ? <><br /><br /></> : <RulesHeader />
                }
                {/* <RulesHeader /> */}
                {/* {
                    paginatedData.paginated.length !== 0 && (stepState.step === "error" ? erroredState.tasks.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName === v.entityName)) === i).map((task) => {
                        return <Dropdown
                            progress={task.progress}
                            requestResult={task.requestResult}
                            success={task.errorMessage}
                            name={task.entityName}
                            etc={task.etc}
                            fields={task.fields}
                            deleteOrMask={task.maskOperation}
                            actions={task.text ? task.text : 'You are going to delete all records.'}
                            filter={task.filter}
                            totalRecords={task.totalRecords}
                            successRecords={task.successRecords}
                            errorText={task.errortext}
                            records={task.records}
                            logicalName={task.logicalName}
                            open={task.open}
                        />
                    }) : paginatedData.paginated.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName === v.entityName)) === i).map((task) => {
                        return <Dropdown
                            progress={task.progress}
                            requestResult={task.requestResult}
                            success={task.errorMessage}
                            name={task.entityName}
                            etc={task.etc}
                            fields={task.fields}
                            deleteOrMask={task.maskOperation}
                            actions={task.text ? task.text : 'You are going to delete all records.'}
                            filter={task.filter}
                            totalRecords={task.totalRecords}
                            successRecords={task.successRecords}
                            errorText={task.errortext}
                            records={task.records}
                            logicalName={task.logicalName}
                            open={task.open}
                        />
                    }))
                } */}

                {
                    paginatedData.paginated.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName === v.entityName)) === i).map((task) => {
                        return <Dropdown
                            progress={task.progress}
                            requestResult={task.requestResult}
                            success={task.errorMessage}
                            name={task.entityName}
                            etc={task.etc}
                            fields={task.fields}
                            deleteOrMask={task.maskOperation}
                            actions={task.text ? task.text : 'You are going to delete all records.'}
                            filter={task.filter}
                            totalRecords={task.totalRecords}
                            successRecords={task.successRecords}
                            errorText={task.errortext}
                            records={task.records}
                            logicalName={task.logicalName}
                            open={task.open}
                        />
                    })
                }

                {
                    !loading && paginatedData.paginated.length === 0 && (searchState !== '' ? <div className='nonentities'>
                        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="70" height="70" rx="4" fill="#F9FAFF" />
                            <path d="M34 19C42.2843 19 49 25.7157 49 34C49 42.2843 42.2843 49 34 49C25.7157 49 19 42.2843 19 34C19 25.7157 25.7157 19 34 19ZM34 21.25C26.9584 21.25 21.25 26.9584 21.25 34C21.25 41.0416 26.9584 46.75 34 46.75C41.0416 46.75 46.75 41.0416 46.75 34C46.75 26.9584 41.0416 21.25 34 21.25Z" fill="#1E2432" />
                            <path d="M35.875 28C35.875 28.8284 35.2034 29.5 34.375 29.5C33.5466 29.5 32.875 28.8284 32.875 28C32.875 27.1716 33.5466 26.5 34.375 26.5C35.2034 26.5 35.875 27.1716 35.875 28Z" fill="#1E2432" />
                            <path d="M33.25 32.125V39.625C33.25 40.2463 33.7537 40.75 34.375 40.75C34.9963 40.75 35.5 40.2463 35.5 39.625V32.125C35.5 31.5037 34.9963 31 34.375 31C33.7537 31 33.25 31.5037 33.25 32.125Z" fill="#1E2432" />
                        </svg>
                        <Header headerType="modal__header" text="Nothing found" />
                    </div> : <NonEntites />)
                }

                {
                    defaultTasksState.tasks.length === 0 ? <><br /><br /></> : <RulesFooter />
                }
            </Box>

            {modalState.open && <RulesModalForDelete />}
            {modalState.runActionOpen && <RulesModalForRun />}
            {modalState.addEntity && <RulesModalForAddEntity />}
            {modalState.addFields && <TableModalForFields />}
        </div>
    )
}

export default React.memo(Rules)