import React, { useEffect, useState } from "react";
import { DropdownHeaderPorpTypes } from '../Dropdown.types';
import { ReducerType } from '../../../redux/reducers/reducer.types';
import { useSelector, useDispatch } from 'react-redux';
import ProgressLoader from '../../ProgressLoader';
import DropdownHeaderToggleIcon from './elements/DropdownHeaderToggleIcon';
import { setAllViewsByEntity, prepareEntitiesForDeleteItemsPutThemAll, setDefaultTasks, setPaginatedTasks } from '../../../redux/actions';
import { addDeleteOrMaskViaHeader } from '../../../utils/ViewsByEntityUtils';
import MultiProgress from './MultipleProgressBar'
import { returnInsideViews } from './DROPDOWN__UTILS'
import { getPaginatedData } from '../../../utils/pagiantionUtil'

function DropdownHeader({ setToggle, deleteOrMask, name, etc, actions, success, progress, requestResult, totalRecords, successRecords, errorText, logicalName, filter }: DropdownHeaderPorpTypes) {
    const dispatch = useDispatch();

    const [insideViews, setinsideViews] = useState<any>({
        data: []
    })
    const stepState = useSelector((state: ReducerType) => state.stepReducer);
    const requestProgressState = useSelector((state: ReducerType) => state.requestProgressReducer);
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer)
    const [progressNumber, setprogressNumber] = useState(0)
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites);
    const defaultTaskState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks)
    const modalState = useSelector((state: ReducerType) => state.modalReducer);
    const paginationState = useSelector((state: ReducerType) => state.paginationReducer);
    const progressState = useSelector((state: ReducerType) => state.progressReducer.number)


    useEffect(() => {
        if (progressState === 0 && progressNumber === 100) {
            setprogressNumber(1)
            console.log("haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", progressNumber)
        }
    }, [progressState])



    useEffect(() => {

        console.log(successRecords, totalRecords, progress, 'dasdasdasdasd succces')
        // setprogressNumber(0)
        if (progress) {
            setprogressNumber(1)
        }

        if (success !== null) {
            setprogressNumber(100)
        }

        if (progress === "END") {
            // setprogressNumber(1)
            setprogressNumber((prev) => prev + (successRecords * 100 / totalRecords) - 10)

            if (success === false && totalRecords === successRecords) {
                setprogressNumber(100)
            }


            if (success !== null) {
                setprogressNumber(100)
            }



            if (success === true) {
                setprogressNumber(100)
            }
        }

        return () => {
            setprogressNumber(0)
        }
    }, [progress, successRecords, totalRecords, success])


    useEffect(() => {
        console.log(modalState,'cahhgbebgs')
        setprogressNumber(1)
    }, [modalState.runActionOpen])
    


    
    useEffect(() => {

        console.log(deleteEntitiesReducer,'hoooootttyyy deleteEntitiesReducer')
        console.log( viewsByEntityState.entities,'hoooootttyyy  viewsByEntityState.entities')
        console.log(filter,'hoooootttyyy filter')
        returnInsideViews(deleteEntitiesReducer.delete, viewsByEntityState.entities, logicalName ? logicalName : name, stepState.step).then((data) => {


            let newData: any = []
            filter && filter.map((item: any) => {
                data.map((it) => {
                    if (it.name === item) {
                        newData.push(it)
                    }
                })
            })

            setinsideViews((prev: any) => ({
                ...prev,
                data: newData
            }))

            
        })


        return () => {
            setinsideViews((prev: any) => ({
                ...prev,
                data: []
            }))
        }
    }, [deleteEntitiesReducer.delete, deleteEntitiesReducer.delete.length, filter, logicalName, name, stepState.step, viewsByEntityState])




    useEffect(() => {
        let newViewByEntityState = addDeleteOrMaskViaHeader(viewsByEntityState.entities, name, deleteOrMask)
        dispatch(setAllViewsByEntity(newViewByEntityState))
    }, [deleteOrMask])



    const setToggleButNotOnProgress = () => {

        if (stepState.step !== 'progress') {
            setToggle((prev: boolean) => !prev);

            defaultTaskState.map((task) => {

                console.log(name, logicalName, task.entityName, 'ebasdasd')
                if (task.entityName === name) {

                    task.open = !task.open
                }
            })

            dispatch(setDefaultTasks(defaultTaskState))
            const calculation = getPaginatedData(defaultTaskState, paginationState.current, paginationState.range)
            dispatch(setPaginatedTasks(calculation))
            console.log(defaultTaskState, 'defaultTaskStatedefaultTaskStatedefaultTaskState ebasdasd')
        }
    }



    console.log(success,'gagaagaga')

    return (
        <div  id={name} className={`dropdown__header ${!success}`}>
            <h1 onClick={setToggleButNotOnProgress}>
                <span>{name}</span>
            </h1>
            <p onClick={(e) => { setToggleButNotOnProgress() }}>

                {
                    stepState.step === "error" && (insideViews.data.length !== 0 ? insideViews.data.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.name === v.name)) === i).map((item: any) => (<MultiProgress
                        totalRecords={item.totalRecords}
                        successRecords={item.successRecords}
                        item={item}
                        errorText={item.errorText}
                        progress={requestProgressState.current && item.viewId === requestProgressState.current.id && requestProgressState.current.progress}
                        errorMessage={item.errorMessage}
                        name={item.name} />)) : (errorText ? <span className="danger">{errorText}</span> : <span>{actions}</span>))
                }

                {
                    stepState.step === "rules" && <span>{actions}</span>
                }

                {
                    stepState.step === "progress" && (insideViews.data.length !== 0
                        ? insideViews.data.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.name === v.name)) === i).map((item: any) => (<MultiProgress
                            item={item}
                            totalRecords={item.totalRecords}
                            successRecords={item.successRecords}
                            errorText={item.errorText}
                            progress={requestProgressState.current && item.viewId === requestProgressState.current.id && requestProgressState.current.progress}
                            errorMessage={item.errorMessage}
                            name={item.name} />)) : (progressNumber !== 100 ? <ProgressLoader bgcolor={`${!success ? '#80BB5B' : '#CE1E1E'}`} completed={progressNumber} /> : (success ? <span className="danger">{errorText}</span> : <span>{actions}</span>)))
                }

            </p>
            <div style={{width:58}} className="icon__container">
                <DropdownHeaderToggleIcon logicalName={logicalName} insideViews={insideViews.data.length} requestResult={success} name={name} setToggle={setToggleButNotOnProgress} />
            </div>
        </div>
    );
}

export default DropdownHeader