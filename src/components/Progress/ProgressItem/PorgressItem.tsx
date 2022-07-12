
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProgresItemPropTypes } from '../progress.types';
import { Dvider } from './';
import { setStep, setDefaultTasks, setProgressAdd, setPaginatedTasks, setAllViewsByEntity } from '../../../redux/actions';
import { getPaginatedData } from '../../../utils/pagiantionUtil'
import { ReducerType } from '../../../redux/reducers/reducer.types';

function PorgressItem({ icon, text, id, disabled }: ProgresItemPropTypes) {
    const dispatch = useDispatch();
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const paginationState = useSelector((state: ReducerType) => state.paginationReducer);
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);
    const stepState = useSelector((state: ReducerType) => state.stepReducer);

    const travelBetweenSteps = () => {

        if (stepState.step !== 'progress') {
            !disabled && id !== "progress" && dispatch(setStep(id));
            defaultTasksState.tasks.map((task) => {
                task.progress = "START"
                task.requestResult = null
            })


            viewsByEntityState.entities.map((view) => {
                view.data.map((item) => {
                    item.errortext = '';
                    item.errorMessage = null
                })
            })

            dispatch(setAllViewsByEntity(viewsByEntityState.entities))

            dispatch(setDefaultTasks(defaultTasksState.tasks))

            if (id === 'rules') {
                //reset default taskks
                defaultTasksState.tasks.map((task) => {
                    task.errorMessage = null
                })
                dispatch(setProgressAdd(0))
                dispatch(setDefaultTasks(defaultTasksState.tasks))
                const calculation = getPaginatedData(defaultTasksState.tasks, paginationState.current, paginationState.range)
                dispatch(setPaginatedTasks(calculation))
                //reset default taskks end
            }
        }

    }

    return (
        <>
            <div onClick={travelBetweenSteps} className={`progress__item ${disabled && 'progress__item--disable'}`}>
                <span className='progress__item__text'>{text}</span>
                {icon}
            </div>
            {id !== "progress" && <Dvider />}
        </>
    )
}

export default React.memo(PorgressItem)