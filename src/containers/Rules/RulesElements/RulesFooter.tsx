import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Pagination } from '../../../components';
import { setModalToggleActions, setProgressAdd, setAllEntities, setStep, setViewsByEntity, setProgressReset, setDefaultTasks, setErroredTasks, setPaginatedTasks, refresh, getCustomRules, setAllVocabularies, setLoader } from '../../../redux/actions';
import { ReducerType } from '../../../redux/reducers/reducer.types'
import { getPaginatedData } from '../../../utils/pagiantionUtil'
import { ClearTasks, GetEntities, GetDefaultTasks, GetAttributesByEntity, GetCustomRules, GetVocabularesList, GetViewsByEntity } from '../../../api';
import { defaultTaskAddETC } from '../../../utils/DefaultTaskETC'
import { DefaultTasksTypes } from '../../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'
import stableDataReducer from '../../../redux/reducers/backend-reducers/stablep-data';
import { getURL } from '../../../api/url.api'

function getDifference(array1: DefaultTasksTypes[], array2: DefaultTasksTypes[]) {
    return array1.filter(object1 => {
        return !array2.some(object2 => {
            return object1.entityName.toLowerCase() === object2.entityName.toLowerCase();
        });
    });
}



function RulesFooter() {
    const progressState = useSelector((state: ReducerType) => state.progressReducer.number)
    const defaultTaskState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks)
    const paginatedTasksdState = useSelector((state: ReducerType) => state.paginatedTasksdReducer.paginated)
    const stepState = useSelector((state: ReducerType) => state.stepReducer.step);
    const erroredState = useSelector((state: ReducerType) => state.erroredTaskReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const paginationState = useSelector((state: ReducerType) => state.paginationReducer);
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer)
    const paginatedData = useSelector((state: ReducerType) => state.paginatedTasksdReducer);
    const [URL, setURL] = useState('')
    const dispatch = useDispatch();

    const RunFunction = async () => {
        dispatch(setModalToggleActions(true))
        dispatch(setProgressAdd(0))
        if (stepState === "error") {
            dispatch(setPaginatedTasks(erroredState.tasks))
        }
    }

    // useEffect(() => {
    //     getVersion().then((data)=>setURL(data))
    // }, [])



    const getEntitiesAndTasks = async () => {
        let entities = await GetEntities();
        dispatch(setAllEntities(entities));
        // setAllViewsByEntity
        let tasks = await GetDefaultTasks();
        let newTasks = await defaultTaskAddETC(entities, tasks);

        tasks.map(async (task: DefaultTasksTypes) => {



            let atributes = await GetAttributesByEntity(task.entityName, task.etc);
            atributes.map((atribute: any) => {
                task.progress = "NULL";
                task.requestResult = null
                task.filter = []
                task.records = true
                task.open = false

                task.fields.map((field) => {
                    if (atribute.logicalName === field.logicalName) {
                        field.displayName = atribute.displayName
                        field.attributeTypeCode = atribute.attributeTypeCode;
                        field.requiredLevel = atribute.requiredLevel
                    }
                })

                let filteredTasks = task.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7)
                task.maskOperation ? task.text = `All Records ${filteredTasks.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields are masked` : task.text = "Delete"
            })
        })

        let nenew = getDifference(newTasks, defaultTasksState.tasks)
        
        dispatch(setDefaultTasks(nenew));
        
        let customRules = await GetCustomRules();
        dispatch(getCustomRules(customRules))
        let vocabularies = await GetVocabularesList();
        dispatch(setAllVocabularies(vocabularies))
        dispatch(setLoader(false));
    }

    const maskAnother = async () => {
        dispatch(setLoader(true));
        dispatch(setProgressReset())
        dispatch(refresh())
        await ClearTasks()
        await getEntitiesAndTasks()


        for (const item of paginatedData.paginated) {
            let viewsByEntity = await GetViewsByEntity(item.logicalName ? item.logicalName : item.entityName, item.etc);
            viewsByEntity.map((view: any) => {
                view.maskOperation = item.maskOperation
            })
            if (viewsByEntityState.entities.some((value) => value.name === item.entityName) === false) {
                dispatch(setViewsByEntity({ name: item.logicalName ? item.logicalName : item.entityName, data: viewsByEntity }))
            }
        }

        dispatch(setStep('rules'))
        dispatch(setLoader(false));

        // defaultTaskState.map((task) => {
        //     task.progress = "START"
        //     task.requestResult = null
        //     task.filter = [];
        //     task.records = true;
        //     task.text = task.text = `All Records ${task.fields.filter((item: any) => item.attributeTypeCode === 14 || item.attributeTypeCode === 7 || item.attributeTypeCode === 2).length} fields are masked`
        // })
        // dispatch(setDefaultTasks(defaultTaskState))

        // dispatch(setStep('rules'))

        // //reset default taskks
        // defaultTasksState.tasks.map((task) => {
        //     task.errorMessage = null
        // })
        // dispatch(setProgressAdd(0))
        // dispatch(setDefaultTasks(defaultTasksState.tasks))
        // const calculation = getPaginatedData(defaultTasksState.tasks, paginationState.current, paginationState.range)
        // dispatch(setPaginatedTasks(calculation))
        // //reset default taskks end
        // window.location.reload()

    }


    const goToChangeErrorsPage = () => {
        let newArray: any = []

        paginatedTasksdState.map((task) => {
            if (task.errorMessage) {
                dispatch(setErroredTasks(task))
                newArray.push(task)
            }
        })

        dispatch(setPaginatedTasks(newArray))
        dispatch(setStep('error'))
    }



    return (
        <>
            <div style={{ paddingTop: 40, paddingLeft: 30 }}>
                {
                    stepState !== "progress" && <Pagination />
                }
            </div>
            <div className="rules__button">

                {
                    paginatedTasksdState.length !== 0 && progressState === paginatedTasksdState.length && !defaultTaskState.some((value: any) => value.errorMessage) && <Button onClick={maskAnother} text="Mask another entities" />
                }

                {
                    paginatedTasksdState.length !== 0 && progressState === paginatedTasksdState.length && defaultTaskState.some((value: any) => value.errorMessage) && <a className='log-button' target={'_blank'} rel="noreferrer" download href={`${getURL()}//WebResources/uds_BusinessDataMaskingReprort`} >Download logs</a>
                }


                {
                    stepState === "error" && <a className='log-button' target={'_blank'} rel="noreferrer" download href={`${getURL()}//WebResources/uds_BusinessDataMaskingReprort`} >Download logs</a>
                }

                {
                    stepState !== "progress" && <Button size='run' type={'gold'} onClick={RunFunction} text="RUN" />
                }

                {
                    stepState !== "error" && progressState === paginatedTasksdState.length && defaultTaskState.some((value: any) => value.errorMessage) && <Button type="settings" onClick={goToChangeErrorsPage} text="Change setting" />
                }
            </div>
        </>
    )
}

export default React.memo(RulesFooter)