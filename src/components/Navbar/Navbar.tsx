/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../Input';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { setLoader, setDefaultTasks, setAllEntities, getCustomRules, setAllVocabularies, setAllViewsByEntity, setProgressAdd, setStep, setViewsByEntity, setPaginationRange, prepareEntitiesForDelete, setStableDefaultTasks, setAproveNotificationAgreement, setNotificationAllowance } from '../../redux/actions';
import { GetDefaultTasks, GetEntities, GetCustomRules, GetVocabularesList, GetAttributesByEntity, GetTasksStatus, GetViewsByEntity, ClearTasks } from '../../api';
import Logo from './logo';
import { defaultTaskAddETC } from '../../utils/DefaultTaskETC';
import { DefaultTasksTypes } from '../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'
import { prepareCells } from '../../utils/run.utils';


function Navbar() {
    const dispatch = useDispatch();
    const stepState = useSelector((state: ReducerType) => state.stepReducer.step);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks);
    const [search, setSearch] = useState('')
    const [oldPaginatedTasks, setoldPaginatedTasks] = useState<any[]>([])
    const stableDataReducer = useSelector((state: ReducerType) => state.stableDataReducer.tasks)
    const paginatedData = useSelector((state: ReducerType) => state.paginatedTasksdReducer);
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites);
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);
    const paginatedTasksdState = useSelector((state: ReducerType) => state.paginatedTasksdReducer.paginated)

    // useEffect(() => {
    //     const filteredEntities = defaultTasksState.filter(
    //         entity => {
    //             return (
    //                 entity
    //                     .entityName
    //                     .toLowerCase()
    //                     .includes(search.toLowerCase()));
    //         }
    //     );

    //     dispatch(setPaginatedTasks(filteredEntities))
    // }, [search])






    const getEntitiesAndTasks = async () => {
        dispatch(setLoader(true))
        let entities = await GetEntities();
        dispatch(setAllEntities(entities));

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




        dispatch(setDefaultTasks(newTasks));

        // status check start

        let tasksForStatus: any[] = []



        let newArrayForEntity: any[] = []
        for (const vv of entities) {
            newArrayForEntity.push({
                entityName: vv.displayName,
                logicalName: vv.logicalName,
                errorMessage: null,
                delete: true,
                errorRecords: 0,
                etc: vv.etc,
                fields: [],
                filter: [],
                filterViewId: null,
                maskOperation: false,
                previousTaskId: null,
                progress: "NULL",
                requestResult: null,
                successRecords: 0,
                taskId: null,
                taskStatus: 0,
                text: "Delete",
                totalRecords: 0,
                records: true
            })
        }


        let stableTasks: any = [...newTasks, ...newArrayForEntity]
        dispatch(setStableDefaultTasks([...newTasks, ...newArrayForEntity]))

        let deleteEntitites: any = []

        console.log(newTasks)
        console.log(stableTasks, 'atete')
        let viewsArray: any[] = []

        for (const item of newTasks) {
            let viewsByEntity = await GetViewsByEntity(item.logicalName ? item.logicalName : item.entityName, item.etc);


            for (const view of viewsByEntity) {
                view.maskOperation = item.maskOperation
                view.cells.map((v: any) => {
                    for (const x of item.fields) {
                        if (x.logicalName === v.logicalName) {
                            v.requiredLevel = x.requiredLevel
                        }
                    }
                })
            }




            if (viewsArray.some((value) => value.name === item.entityName) === false) {
                viewsArray.push({ name: item.logicalName ? item.logicalName : item.entityName, data: viewsByEntity })
                dispatch(setViewsByEntity({ name: item.logicalName ? item.logicalName : item.entityName, data: viewsByEntity }))

            }
        }



        GetTasksStatus().then((data) => {



            // if (data.some((value: any) => value.taskStatus === 1 || value.taskStatus === 0)) {
            if (data.length !== 0) {



                dispatch(setStableDefaultTasks([]))

                for (const item of stableTasks) {

                    data.map(async (stat: any) => {
                        if (stat.entityName === (item.logicalName ? item.logicalName : item.entityName)) {
                            if (stat.filterViewId) {
                                console.log(viewsArray, 'alalalala viewsArray')
                                console.log(item, 'alalalala imtem')
                                item.maskOperation = stat.maskOperation
                                item.progress = "END"

                                console.log(tasksForStatus.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i), 'viewsArray tasksForStatus.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i)')


                                if (item.entityName !== 'Activity File Attachment' && item.entityName !== "Phone Call" && item.entityName !== 'Social Profile' && item.entityName !== "Note") {
                                    tasksForStatus.unshift(item)
                                    let viewsByEntity = await GetViewsByEntity(item.logicalName ? item.logicalName : item.entityName, item.etc);

                                    if (viewsArray.some((value) => value.name === item.entityName) === false) {
                                        viewsArray.push({ name: item.logicalName ? item.logicalName : item.entityName, data: viewsByEntity })
                                        dispatch(setViewsByEntity({ name: item.logicalName ? item.logicalName : item.entityName, data: viewsByEntity }))
                                    }

                                }


                                for (const view of viewsArray) {
                                    console.log(view, 'anoteee')
                                    if (view.name === stat.entityName) {

                                        view.data.map(async (viewdata: any) => {
                                            if (viewdata.viewId === stat.filterViewId) {
                                                item.filter = item.filter ? [...item.filter, viewdata.name] : [viewdata.name]
                                                item.text = `View - ${item.filter.join(', ')}`
                                                item.progress = "END"
                                                if (item.maskOperation) {
                                                    let newCells = await prepareCells(viewdata.cells)
                                                    deleteEntitites.push({
                                                        entityName: stat.entityName,
                                                        maskOperation: stat.maskOperation,
                                                        filterViewId: stat.filterViewId,
                                                        fields: newCells
                                                    })
                                                    dispatch(prepareEntitiesForDelete({
                                                        entityName: stat.entityName,
                                                        maskOperation: stat.maskOperation,
                                                        filterViewId: stat.filterViewId,
                                                        fields: newCells
                                                    }))
                                                } else {
                                                    deleteEntitites.push({
                                                        entityName: stat.entityName,
                                                        maskOperation: stat.maskOperation,
                                                        filterViewId: stat.filterViewId,
                                                    })
                                                    dispatch(prepareEntitiesForDelete({
                                                        entityName: stat.entityName,
                                                        maskOperation: stat.maskOperation,
                                                        filterViewId: stat.filterViewId,
                                                    }))
                                                }

                                            }

                                        })
                                    }
                                }


                            }
                            if (item.entityName !== 'Activity File Attachment' && item.entityName !== "Phone Call" && item.entityName !== 'Social Profile' && item.entityName !== "Note") {
                                item.maskOperation = stat.maskOperation
                                if (!stat.maskOperation) {
                                    item.text = "Delete"
                                } else {
                                    if (item.filter.length !== 0 || item.filter) {
                                        item.records = true
                                        item.text = `All Records ${stat.fields.filter((it: any) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields are masked`
                                    } else {
                                        item.records = false
                                        item.text = item.filter && item.filter.length === 0 ? `Nothing selected` : `View - ${item.filter.join(', ')}`

                                    }
                                }
                                item.progress = "END"
                                tasksForStatus.push(item)
                            }



                            console.log(viewsArray, 'viewsArray')



                        }
                    })

                }


                console.log(tasksForStatus, 'tasksForStatus')







                dispatch(setStableDefaultTasks([...tasksForStatus, ...newArrayForEntity]))
                dispatch(setDefaultTasks(tasksForStatus.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i)));



                //interval start


                setTimeout(() => {
                    dispatch(setAproveNotificationAgreement(true));
                    dispatch(setNotificationAllowance(true))
                    dispatch(setPaginationRange(data.length))
                    data.length !== 0 && dispatch(setStep('progress'))
                }, 3000);



                let interval = setInterval(() => {

                    GetTasksStatus().then((data2) => {
                        for (const stat of data2) {
                            if (!stat.filterViewId) {

                                for (const statetask of tasksForStatus.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i)) {
                                    if (stat.entityName === (statetask.logicalName ? statetask.logicalName : statetask.entityName)) {
                                        statetask.successRecords = stat.successRecords
                                        statetask.totalRecords = stat.totalRecords
                                        statetask.maskOperation = stat.maskOperation
                                        if (stat.taskStatus === 2) {
                                            statetask.errorMessage = true
                                            statetask.errortext = stat.errorMessage
                                        }

                                        if (stat.taskStatus === 3) {
                                            statetask.errorMessage = false
                                        }

                                        if (stat.taskStatus === 1 || stat.taskStatus === 0) {
                                            statetask.errorMessage = null
                                        }
                                    }


                                }

                                dispatch(setDefaultTasks(tasksForStatus.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i)))
                            }
                            else {
                                // burda double

                                viewsArray.map((view) => {


                                    if (view.name === stat.entityName) {
                                        view.data.map((vi: any) => {
                                            if (vi.viewId === stat.filterViewId) {

                                                vi.totalRecords = stat.totalRecords
                                                vi.successRecords = stat.successRecords
                                                vi.maskOperation = stat.maskOperation
                                                vi.progress = "END"
                                                if (stat.taskStatus === 1 || stat.taskStatus === 0) {
                                                    vi.errorMessage = null

                                                }

                                                if (stat.taskStatus === 2) {
                                                    vi.errorMessage = true
                                                    vi.errortext = stat.errorMessage

                                                    tasksForStatus.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i).map((t) => {
                                                        if (t.entityName === stat.name || t.logicalName === stat.name) {
                                                            t.errorMessage = true
                                                            // task.errortext = requestSecond.messages[0].message
                                                        }
                                                    })

                                                    // dispatch(setDefaultTasks(defaultTasksState.tasks))

                                                }



                                                if (stat.taskStatus === 3) {
                                                    vi.errorMessage = false
                                                    tasksForStatus.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i).map((t) => {
                                                        if (t.entityName === stat.name) {
                                                            t.errorMessage = false
                                                            // task.errortext = requestSecond.messages[0].message
                                                        }
                                                    })

                                                }

                                            }
                                        })

                                    }
                                })

                                dispatch(setAllViewsByEntity(viewsArray))
                            }

                        }

                        dispatch(setDefaultTasks(tasksForStatus.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i)))

                        let deletedLength = deleteEntitites.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName === v.entityName)) === i).length

                        let notsame = data2.filter((item: any) => item.taskStatus === 2 || item.taskStatus === 3).filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName === v.entityName)) === i)


                        dispatch(setProgressAdd(notsame.length > deletedLength ? notsame.length - deletedLength : notsame.length))

                        if (!data2.some((value: any) => value.taskStatus === 0 || value.taskStatus === 1)) {
                            console.log("bitti")
                            // dispatch(setProgressAdd(paginatedTasksdState.length))
                            clearInterval(interval)
                            ClearTasks()
                            dispatch(setProgressAdd(data2.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i).length))

                        }

                        // dispatch(setDefaultTasks(tasksForStatus.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i)));
                    })

                }, 4000)

                //interval end


            }
        })


        // status check end

        let customRules = await GetCustomRules();
        dispatch(getCustomRules(customRules))
        let vocabularies = await GetVocabularesList();
        dispatch(setAllVocabularies(vocabularies))

        setTimeout(() => {
            dispatch(setLoader(false));

        }, 3000);

    }


    useEffect(() => {
        getEntitiesAndTasks();
        setoldPaginatedTasks(paginatedData.paginated)


    }, [])







    return (
        <nav className='navbar'>
            <Logo />
            {/* <div className="navbar__search">
                <Input onChange={onSearchChange} value={search} disabled={stepState !== "rules"} name="search" className='search' type="text" placeholder='Search' />
            </div> */}
        </nav>
    )
}

export default React.memo(Navbar)