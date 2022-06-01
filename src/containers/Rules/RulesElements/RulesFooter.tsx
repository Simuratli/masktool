import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components';
import { setModalToggleActions, setStep, setProgressReset, setDefaultTasks } from '../../../redux/actions';
import { ReducerType } from '../../../redux/reducers/reducer.types'
import { ClearTasks } from '../../../api'

function RulesFooter() {
    const progressState = useSelector((state: ReducerType) => state.progressReducer.number)
    const defaultTaskState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks)
    const paginatedTasksdState = useSelector((state: ReducerType) => state.paginatedTasksdReducer.paginated)
    const stepState = useSelector((state: ReducerType) => state.stepReducer.step);
    const dispatch = useDispatch();

    const RunFunction = async () => {
        dispatch(setModalToggleActions(true))
    }

    const maskAnother = async () => {
        console.log(defaultTaskState, 'defaultTaskState')
        await ClearTasks()
        defaultTaskState.map((task) => {
            task.progress = "START"
            task.requestResult = null
        })
        dispatch(setDefaultTasks(defaultTaskState))

        dispatch(setStep('rules'))
        dispatch(setProgressReset())

    }

    return (
        <div className="rules__button">
            {
                stepState !== "progress" && <Button onClick={RunFunction} text="RUN" />
            }

            {
                progressState === paginatedTasksdState.length && <Button onClick={maskAnother} text="Mask another entities" />
            }

        </div>
    )
}

export default React.memo(RulesFooter)