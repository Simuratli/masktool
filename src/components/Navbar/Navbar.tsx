/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../Input';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { setLoader, setDefaultTasks, setAllEntities, getCustomRules, setAllVocabularies, setAllViewsByEntity, setProgressAdd, setStep, setViewsByEntity, setPaginationRange, prepareEntitiesForDelete, setStableDefaultTasks, setAproveNotificationAgreement, setNotificationAllowance, setStableEntityByViews } from '../../redux/actions';
import { GetDefaultTasks, GetEntities, GetCustomRules,ClearTasksAndLogs, GetVocabularesList, GetAttributesByEntity, GetTasksStatus, GetViewsByEntity, ClearTasks } from '../../api';
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





    const getEntitiesAndTasks = async () => {
        // ClearTasks()
        // ClearTasksAndLogs()
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
                // task.records = true
                task.logicalName = task.entityName.toLowerCase()
                task.open = false
                task.fields.map((field) => {
                    if (atribute.logicalName === field.logicalName) {
                        field.displayName = atribute.displayName
                        field.attributeTypeCode = atribute.attributeTypeCode;
                        field.requiredLevel = atribute.requiredLevel
                    }

                })



                let filteredTasks = task.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7)
                task.maskOperation ? task.text = `You are going to mask ${task.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields in all records.` : task.text = "You are going to delete all records."
            })
        })




        dispatch(setDefaultTasks(newTasks));

        // status check start

        let tasksForStatus: any[] = []


        let mapFunc = (logicalName: String) => {
            let fields: any = []
            newTasks.map((item) => {
                if (item.entityName === logicalName) {
                    fields = item.fields
                }
            })
            return fields
        }

        let newArrayForEntity: any[] = []
        for (const vv of entities) {

            newArrayForEntity.push({
                entityName: vv.displayName,
                logicalName: vv.logicalName,
                errorMessage: null,
                delete: true,
                errorRecords: 0,
                etc: vv.etc,
                fields: mapFunc(vv.logicalName),
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


        let stableTasks: any = [...newTasks, ...newArrayForEntity].filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName === v.entityName) || (v2.logicalName === v.entityName) || (v2.entityName === v.logicalName)) === i)
        dispatch(setStableDefaultTasks(stableTasks))

        let deleteEntitites: any = []

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
                // dispatch(setStableEntityByViews({ name: item.logicalName ? item.logicalName : item.entityName, data: viewsByEntity }))
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
                                    tasksForStatus.push(item)
                                    let viewsByEntity = await GetViewsByEntity(item.logicalName ? item.logicalName : item.entityName, item.etc);

                                    if (viewsArray.some((value) => value.name === item.entityName) === false) {
                                        viewsArray.push({ name: item.logicalName ? item.logicalName : item.entityName, data: viewsByEntity })
                                        dispatch(setViewsByEntity({ name: item.logicalName ? item.logicalName : item.entityName, data: viewsByEntity }))
                                        console.log({ name: item.logicalName ? item.logicalName : item.entityName, data: viewsByEntity }, 'offfasda')
                                        // dispatch(setStableEntityByViews({ name: item.logicalName ? item.logicalName : item.entityName, data: viewsByEntity }))
                                    }

                                }


                                for (const view of viewsArray) {
                                    console.log(view, 'anoteee')
                                    if (view.name === stat.entityName) {

                                        view.data.map(async (viewdata: any) => {
                                            if (viewdata.viewId === stat.filterViewId) {
                                                // item.filter = item.filter ? [...item.filter, viewdata.name] : [viewdata.name]
                                                console.log(viewdata, 'iameuqal')
                                                if (item.filter) {
                                                    if (!item.filter.some((value: any) => value === viewdata.name)) {
                                                        item.filter = [...item.filter, viewdata.name]

                                                    }
                                                } else {
                                                    item.filter = [viewdata.name]

                                                }


                                                item.maskOperation = stat.maskOperation
                                                item.progress = "END"

                                                if (item.maskOperation) {
                                                    item.text = `You are going to edit fields in ${item.filter.join(' ')}`
                                                } else {
                                                    item.text = `You are going to edit records in ${item.filter.join(' ')}`
                                                }

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



                            if (item.entityName !== 'Activity File Attachment' && item.entityName !== "Phone Call" && item.entityName !== 'Social Profile' && item.entityName !== "Note" && item.logicalName !== 'activitymimeattachment') {
                                item.maskOperation = stat.maskOperation
                                if (!stat.maskOperation) {
                                    item.text = "You are going to delete all records."
                                } else {
                                    if (item.filter) {
                                        if (item.filter.length !== 0) {
                                            item.records = false
                                            item.text = `You are going to mask ${item.fields.filter((it: any) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields in all records.`
                                        }
                                    } else {
                                        item.records = true
                                        item.text = item.filter && item.filter.length === 0 ? `No edits will be applied to this entity as you have not chosen any view.` : `You are going to edit fields in ${item.filter.join(' ')}`

                                    }
                                }
                                item.maskOperation = stat.maskOperation
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
                    dispatch(setPaginationRange(1000))
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
                                            if (statetask.maskOperation) {
                                                statetask.text = `${statetask.fields.filter((it: any) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields in ${stat.successRecords} records were masked.`
                                            } else {
                                                statetask.text = `${stat.successRecords} records were deleted.`
                                            }
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

                                                    // tasksForStatus.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i).map((t) => {

                                                    //     if (t.entityName === stat.entityName) {
                                                    //         t.errorMessage = true
                                                    //         // task.errortext = requestSecond.messages[0].message
                                                    //     }
                                                    //     if (t.logicalName) {
                                                    //         if (t.logicalName === stat.entityName) {
                                                    //             t.errorMessage = true
                                                    //             console.log(t, 'tasksForStatustasksForStatus logical', stat)
                                                    //         }
                                                    //     }


                                                    // })

                                                    // dispatch(setDefaultTasks(defaultTasksState.tasks))

                                                }



                                                if (stat.taskStatus === 3) {
                                                    vi.errorMessage = false
                                                    // tasksForStatus.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i).map((t) => {
                                                    //     console.log('salam3 taskStatustaskStatus', t.entityName, stat)
                                                    //     if (t.entityName === stat.entityName) {

                                                    //         t.errorMessage = false
                                                    //         // task.errortext = requestSecond.messages[0].message
                                                    //         if (t.maskOperation) {
                                                    //             t.text = `${t.fields.filter((it: any) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields in all records were masked.`
                                                    //         } else {
                                                    //             t.text = "All records were deleted."
                                                    //         }
                                                    //     }
                                                    // })

                                                }

                                            }
                                        })
                                        console.log(tasksForStatus, 'taskStatustaskStatus')

                                    }
                                })

                                dispatch(setAllViewsByEntity(viewsArray))
                            }

                        }

                        dispatch(setDefaultTasks(tasksForStatus.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i)))

                        let deletedLength = deleteEntitites.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName === v.entityName)) === i).length

                        let notsame = data2.filter((item: any) => item.taskStatus === 2 || item.taskStatus === 3).filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName === v.entityName)) === i)

                        console.log(notsame, 'notnsatmee')
                        // dispatch(setProgressAdd(notsame.length > deletedLength ? notsame.length - deletedLength : notsame.length))




                        let obj = data2.reduce((res: any, curr: any) => {
                            if (res[curr.entityName])
                                res[curr.entityName].push(curr);
                            else
                                Object.assign(res, { [curr.entityName]: [curr] });

                            return res;
                        }, {});




                        console.log(obj, 'data22 obj')
                        console.log(data2, 'data22')
                        let num = 0

                        data2.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName === v.entityName)) === i).map((dat: any) => {
                            if (!obj[dat.entityName].some((value: any) => value.taskStatus === 0 || value.taskStatus === 1)) {
                                console.log(obj[dat.entityName], 'offfffffffffffffffffffffffffffffffffff data22')
                                num++
                                dispatch(setProgressAdd(num))
                            }

                        })

                        console.log()
                        Object.keys(obj).map(function (key) {
                                console.log(obj[key], 'obj[key]')
                                if (!obj[key].some((value: any) => value.taskStatus === 0 || value.taskStatus === 1)) {
                                    if (obj[key].some((value: any) => value.taskStatus === 2)) {
                                        console.log(obj[key],'hhohoho')
                                    }

                                    tasksForStatus.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i).map((t) => {
                                        console.log('sal5 taskStatustaskStatus', t.entityName, key)
                                        if ((t.logicalName ? t.logicalName : t.entityName) === key) {
                                            if (obj[key].some((value: any) => value.taskStatus === 2)) {
                                                t.errorMessage = true
                                            }else{
                                                t.errorMessage = false
                                            }
                                        }
                                    })

                                    dispatch(setDefaultTasks(tasksForStatus.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i)))
                                }

                        });


                        if (!data2.some((value: any) => value.taskStatus === 0 || value.taskStatus === 1)) {
                            console.log("bitti")
                            // dispatch(setProgressAdd(paginatedTasksdState.length))
                            clearInterval(interval)
                            // ClearTasks()



                            console.log(Object.keys(obj).length, 'data22 tasksForStatus')
                            dispatch(setProgressAdd(Object.keys(obj).length))

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