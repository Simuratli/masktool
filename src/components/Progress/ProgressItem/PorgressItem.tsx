
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProgresItemPropTypes } from '../progress.types';
import { Dvider } from './';
import { setStep, setDefaultTasks, setProgressAdd, setPaginatedTasks } from '../../../redux/actions';
import { getPaginatedData } from '../../../utils/pagiantionUtil'
import { ReducerType } from '../../../redux/reducers/reducer.types';

function PorgressItem({ icon, text, id, disabled }: ProgresItemPropTypes) {
    const dispatch = useDispatch();
    const defaultTaskState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks)
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const paginationState = useSelector((state: ReducerType) => state.paginationReducer);

    const travelBetweenSteps = () => {
        !disabled && id !== "progress" && dispatch(setStep(id));
        defaultTaskState.map((task) => {
            task.progress = "START"
            task.requestResult = null
        })
        dispatch(setDefaultTasks(defaultTaskState))

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