
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProgresItemPropTypes } from '../progress.types';
import { Dvider } from './';
import { setStep, setDefaultTasks } from '../../../redux/actions';
import { ReducerType } from '../../../redux/reducers/reducer.types';

function PorgressItem({ icon, text, id, disabled }: ProgresItemPropTypes) {
    const dispatch = useDispatch();
    const defaultTaskState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks)

    const travelBetweenSteps = () => {
        !disabled && id !== "progress" && dispatch(setStep(id));
        defaultTaskState.map((task) => {
            task.progress = "START"
            task.requestResult = null
        })
        dispatch(setDefaultTasks(defaultTaskState))
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