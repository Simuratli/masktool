import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Pagination } from '../../../components';
import { setModalToggleActions, setProgressAdd, setAllEntities, setStep, setViewsByEntity, setStableDefaultTasks, setDefaultTasks, setErroredTasks, prepareEntitiesForDeleteItemsPutThemAll, refresh, getCustomRules, setAllVocabularies, setLoader } from '../../../redux/actions';
import { ReducerType } from '../../../redux/reducers/reducer.types'
import { ClearTasks, GetEntities, GetDefaultTasks, GetAttributesByEntity, GetCustomRules, GetVocabularesList, GetViewsByEntity } from '../../../api';
import { defaultTaskAddETC } from '../../../utils/DefaultTaskETC'
import { DefaultTasksTypes } from '../../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'
import { getURL } from '../../../api/url.api'



function RulesFooter() {
    const progressState = useSelector((state: ReducerType) => state.progressReducer.number)
    const defaultTaskState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks)
    const paginatedTasksdState = useSelector((state: ReducerType) => state.paginatedTasksdReducer.paginated)
    const stepState = useSelector((state: ReducerType) => state.stepReducer.step);
    const erroredState = useSelector((state: ReducerType) => state.erroredTaskReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const paginationState = useSelector((state: ReducerType) => state.paginationReducer);
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer)
    const stableDataReducer = useSelector((state: ReducerType) => state.stableDataReducer)
    const searchState = useSelector((state: ReducerType) => state.searchReducer.search)
    const [URL, setURL] = useState('')
    const dispatch = useDispatch();

    const RunFunction = async () => {
        dispatch(setModalToggleActions(true))
        dispatch(setProgressAdd(0))
        // if (stepState === "error") {
        // }
    }



    const maskAnother = async () => {
        dispatch(prepareEntitiesForDeleteItemsPutThemAll([]));
        console.log(defaultTaskState,'defaultTaskState')
        dispatch(setStableDefaultTasks([...stableDataReducer.tasks, ...defaultTaskState]))
        dispatch(setDefaultTasks([]))
        dispatch(setStep('rules'))
    }

    const [disableRunButton, setdisableRunButton] = useState<any>([])


    const goToChangeErrorsPage = () => {

        let newArray: any = []
        paginatedTasksdState.map((task) => {
            if (task.errorMessage) {
                dispatch(setErroredTasks(task))
                if (task.filter) {
                    if (task.filter.length !== 0) {
                        task.records = false
                        console.log(viewsByEntityState, 'denemelelel')
                        let filteredViews = viewsByEntityState.entities.filter((view) => view.name === (task.logicalName ? task.logicalName : task.entityName))
                        let newFilter = []
                        for (const view of filteredViews[0].data) {
                            for (const filterName of task.filter) {
                                if (view.name === filterName) {
                                    if (view.errorMessage) {
                                        newFilter.push(view.name)
                                    }
                                }
                            }
                        }
                        task.filter = newFilter
                        console.log(viewsByEntityState.entities.filter((view) => view.name === (task.logicalName ? task.logicalName : task.entityName)), 'viewsByEntityState.entities.filter((view)=>view.name === (task.logicalName ? task.logicalName : task.entityName))')


                    } else {
                        task.records = true
                    }
                } else {
                    task.records = true
                }
                newArray.push(task)
            }
        })



        dispatch(setDefaultTasks(newArray))
        dispatch(setStep('error'))
        setdisableRunButton(newArray)

        // setdisableRunButton(newArray)
    }









    console.log(disableRunButton, defaultTaskState.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i), 'asfsdfsdfsdfsdf')





    return (
        <>
            <div style={{ paddingTop: 40, paddingLeft: 30 }}>
                {
                    stepState !== "progress" && <Pagination />
                }
            </div>
            <div className="rules__button">

                {
                    stepState === "progress" && paginatedTasksdState.length !== 0 && progressState === paginatedTasksdState.length && !defaultTaskState.some((value: any) => value.errorMessage) && <Button size="small" onClick={maskAnother} text="Mask another entities" />
                }

                {
                    paginatedTasksdState.length !== 0 && progressState === paginatedTasksdState.length && defaultTaskState.some((value: any) => value.errorMessage) && <a className='log-button' target={'_blank'} rel="noreferrer" download href={`${getURL()}//WebResources/uds_BusinessDataMaskingReprort?preview=1`} >Download logs</a>
                }


                {
                    stepState === "error" && <a className='log-button' target={'_blank'} rel="noreferrer" download href={`${getURL()}//WebResources/uds_BusinessDataMaskingReprort?preview=1`} >Download logs</a>
                }

                {
                    stepState !== "progress" && (searchState ? <Button size='run' type={'gold'} onClick={RunFunction} text="RUN" /> : (paginatedTasksdState.length !== 0 && <Button size='run' type={'gold'} onClick={RunFunction} text="RUN" />))
                }

                {
                    stepState !== "error" && progressState === paginatedTasksdState.length && defaultTaskState.some((value: any) => value.errorMessage) && <Button type="settings" onClick={goToChangeErrorsPage} text="Change setting" />
                }
            </div>
        </>
    )
}

export default React.memo(RulesFooter)