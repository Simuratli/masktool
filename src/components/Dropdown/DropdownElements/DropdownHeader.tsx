import React, { useEffect, useState } from "react";
import { SuccessIcon } from "./icons";
import { DropdownHeaderPorpTypes } from '../Dropdown.types';
import { ReducerType } from '../../../redux/reducers/reducer.types';
import { useSelector, useDispatch } from 'react-redux';
import ProgressLoader from '../../ProgressLoader';
import DropdownHeaderToggleIcon from './elements/DropdownHeaderToggleIcon';
import { GetViewsByEntity } from '../../../api';
import { setViewsByEntity, setAllViewsByEntity, setStableEntityByViews } from '../../../redux/actions';
import { EntityByViewType } from '../../../redux/reducers/backend-reducers/entity-by-view/entity-by-view.types';
import { addDeleteOrMaskViaHeader } from '../../../utils/ViewsByEntityUtils';
import MultiProgress from './MultipleProgressBar'
import { ToggleIcon } from './icons'

function DropdownHeader({ setToggle, deleteOrMask, name, etc, actions, success, progress, requestResult, totalRecords, successRecords }: DropdownHeaderPorpTypes) {
    const dispatch = useDispatch();

    const [insideViews, setinsideViews] = useState<any>({
        data: []
    })
    const stepState = useSelector((state: ReducerType) => state.stepReducer);
    const requestProgressState = useSelector((state: ReducerType) => state.requestProgressReducer);
    const progressState = useSelector((state: ReducerType) => state.progressReducer.number)

    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer)
    const [progressNumber, setprogressNumber] = useState(0)
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites);





    let fetchViewsByEntityFunction = async () => {
        let viewsByEntity = await GetViewsByEntity(name, etc);
        viewsByEntity.map((view: EntityByViewType) => {
            view.maskOperation = deleteOrMask
        })

        console.log('burasit est', name)
        // dispatch(setViewsByEntity({ name: name, data: viewsByEntity }))
    }

    useEffect(() => {
        fetchViewsByEntityFunction();
    }, [])


    useEffect(() => {
        setprogressNumber(0)
        if (progress === "START") {
            setprogressNumber(0)
        }

        if (progress === "END") {
            let stop: boolean = true
            // let number: number = 0
            // while (stop) {
            //     if (number === 101) stop = false
            //     setprogressNumber(number++)
            // }
            setprogressNumber((prev) => prev + (successRecords * 100 / totalRecords))

            if (success === false && totalRecords === successRecords) {
                setprogressNumber(100)
            }

        }

        return () => {
            setprogressNumber(0)
        }
    }, [progress, successRecords, totalRecords, success,])



    useEffect(() => {
        let data: any = []
        deleteEntitiesReducer.delete.map((deletedItem) => {
            if (deletedItem.entityName === name) {
                viewsByEntityState.entities.map((view) => {
                    if (view.name === name) {
                        view.data.map((item) => {
                            if (item.viewId === deletedItem.filterViewId) {
                                if (stepState.step === "error") {
                                    if (item.errorMessage === true) {
                                        data.push(item)
                                    }
                                } else {
                                    data.push(item)
                                }
                                setinsideViews((prev: any) => ({
                                    ...prev,
                                    data: data
                                }))

                                console.log(data, 'burasi view datasidier')
                            }
                        })
                    }
                })
            }
        })

    }, [deleteEntitiesReducer])


    console.log(insideViews, 'ABO VIEWS')



    useEffect(() => {
        let newViewByEntityState = addDeleteOrMaskViaHeader(viewsByEntityState.entities, name, deleteOrMask)
        dispatch(setAllViewsByEntity(newViewByEntityState))
    }, [deleteOrMask])


    const scrollView = () => {
        let element: HTMLElement | null = document.getElementById(name)
        element && element.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
    }



    return (
        <div id={name} onClick={scrollView} className={`dropdown__header ${!success}`}>
            <h1 onClick={() => { setToggle((prev: boolean) => !prev); }}>
                <span>{name}</span>
            </h1>
            <p onClick={(e) => { setToggle((prev: boolean) => !prev); window.scrollTo(0, 0) }}>
                {stepState.step === "progress" && progressNumber !== 100 ? ((insideViews.data.length !== 0 ? insideViews.data.map((item: any) => (<MultiProgress progress={requestProgressState.current && item.viewId === requestProgressState.current.id && requestProgressState.current.progress} errorMessage={item.errorMessage} name={item.name} />)) : <ProgressLoader bgcolor={`${!success ? '#80BB5B' : '#CE1E1E'}`} completed={progressNumber} />)) : <span>{actions}</span>}
            </p>
            <DropdownHeaderToggleIcon requestResult={success} name={name} setToggle={setToggle} />
        </div>
    );
}

export default DropdownHeader
