import { MainView } from './view';
import { Loader } from './components';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { ReducerType } from './redux/reducers/reducer.types';
import { GetTasksStatus } from './api';
import { setStep, setAllViewsByEntity, setDefaultTasks, setProgressAdd } from './redux/actions'

function App() {
  const dispatch = useDispatch()
  const loading = useSelector((state: ReducerType) => state.loaderReducer.loading)
  const modalState = useSelector((state: ReducerType) => state.modalReducer);
  const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
  const paginatedData = useSelector((state: ReducerType) => state.paginatedTasksdReducer);
  const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites);
  const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);

  // useEffect(() => {
  //   GetTasksStatus().then((data) => {
  //     console.log(data, 'process')
  //     data.some((value: any) => value.taskStatus === 1 || value.taskStatus === 0) && dispatch(setStep('progress'))

  //     if (data.some((value: any) => value.taskStatus === 1 || value.taskStatus === 0)) {
  //       let interval = setInterval(() => {
  //         GetTasksStatus().then((data) => {
  //           console.log(data.some((value: any) => value.taskStatus !== 1 && value.taskStatus !== 0), 'tesoneont progress', data)


  //           data.map((status: any) => {
  //             if (!status.filterViewId) {
  //               defaultTasksState.tasks.map((task) => {
  //                 if (status.entityName === (task.logicalName ? task.logicalName : task.entityName)) {

  //                   task.successRecords = status.successRecords
  //                   task.totalRecords = status.totalRecords

  //                   if (status.taskStatus === 2) {
  //                     task.errorMessage = true
  //                     task.errortext = status.errorMessage
  //                   }

  //                   if (status.taskStatus === 3) {
  //                     task.errorMessage = false
  //                   }

  //                   if (status.taskStatus === 1 || status.taskStatus === 0) {
  //                     task.errorMessage = null
  //                   }

  //                 }
  //               })

  //             } else {
  //               // burda double

  //               viewsByEntityState.entities.map((view) => {


  //                 if (view.name === status.entityName) {
  //                   view.data.map((vi) => {
  //                     if (vi.viewId === status.filterViewId) {
  //                       console.log(vi, 'salammm')

  //                       vi.totalRecords = status.totalRecords
  //                       vi.successRecords = status.successRecords
  //                       if (status.taskStatus === 1 || status.taskStatus === 0) {
  //                         vi.errorMessage = null

  //                       }

  //                       if (status.taskStatus === 2) {
  //                         vi.errorMessage = true
  //                         vi.errortext = status.errorMessage

  //                         defaultTasksState.tasks.map((task) => {
  //                           if (task.entityName === view.name || task.logicalName === view.name) {
  //                             task.errorMessage = true
  //                             // task.errortext = requestSecond.messages[0].message
  //                           }
  //                         })

  //                         // dispatch(setDefaultTasks(defaultTasksState.tasks))

  //                       }



  //                       if (status.taskStatus === 3) {
  //                         vi.errorMessage = false
  //                         defaultTasksState.tasks.map((task) => {
  //                           console.log(task, 'alallalala', view.name)
  //                           if (task.entityName === view.name) {
  //                             task.errorMessage = false
  //                             // task.errortext = requestSecond.messages[0].message
  //                           }
  //                         })

  //                       }

  //                     }
  //                   })

  //                 }
  //               })

  //               dispatch(setAllViewsByEntity(viewsByEntityState.entities))
  //             }
  //           })

  //           dispatch(setDefaultTasks(defaultTasksState.tasks))

  //           let deletedLength = deleteEntitiesReducer.delete.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName === v.entityName)) === i).length

  //           let notsame = data.filter((item: any) => item.taskStatus === 2 || item.taskStatus === 3).filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName === v.entityName)) === i)


  //           dispatch(setProgressAdd(notsame.length > deletedLength ? notsame.length - deletedLength : notsame))
  //           console.log(data.filter((item: any) => item.taskStatus === 2 || item.taskStatus === 3).length, 'hmmmasmdas', data)
  //           console.log(paginatedData.paginated, 'paginated.tasks',)
  //           if (!data.some((value: any) => value.taskStatus === 0 || value.taskStatus === 1)) {
  //             dispatch(setProgressAdd(paginatedData.paginated.length))
  //             clearInterval(interval)

  //           }


  //         })
  //       }, 2000)
  //     }
  //   })
  // }, [])




  return (
    <div style={{ overflow: modalState.open || modalState.runActionOpen || modalState.addEntity || modalState.addFields ? 'hidden' : "unset", height: modalState.open || modalState.runActionOpen || modalState.addEntity || modalState.addFields ? '100vh' : "max-content" }} className="App">
      {loading && <Loader />}
      <MainView />
    </div>
  );
}

export default App;
