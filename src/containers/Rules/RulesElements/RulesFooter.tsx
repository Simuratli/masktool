import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components';
import { setModalToggleActions, setProgressAdd, setStep, setProgressReset, setDefaultTasks, setErroredTasks, setPaginatedTasks } from '../../../redux/actions';
import { ReducerType } from '../../../redux/reducers/reducer.types'
import { getPaginatedData } from '../../../utils/pagiantionUtil'
import { ClearTasks } from '../../../api'

function RulesFooter() {
    const progressState = useSelector((state: ReducerType) => state.progressReducer.number)
    const defaultTaskState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks)
    const paginatedTasksdState = useSelector((state: ReducerType) => state.paginatedTasksdReducer.paginated)
    const stepState = useSelector((state: ReducerType) => state.stepReducer.step);
    const erroredState = useSelector((state: ReducerType) => state.erroredTaskReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const paginationState = useSelector((state: ReducerType) => state.paginationReducer);

    const dispatch = useDispatch();

    const RunFunction = async () => {
        dispatch(setModalToggleActions(true))
    }

    const maskAnother = async () => {
        await ClearTasks()
        defaultTaskState.map((task) => {
            task.progress = "START"
            task.requestResult = null
        })
        dispatch(setDefaultTasks(defaultTaskState))

        dispatch(setStep('rules'))

        //reset default taskks
        defaultTasksState.tasks.map((task) => {
            task.errorMessage = null
        })
        dispatch(setProgressAdd(0))
        dispatch(setDefaultTasks(defaultTasksState.tasks))
        const calculation = getPaginatedData(defaultTasksState.tasks, paginationState.current, paginationState.range)
        dispatch(setPaginatedTasks(calculation))
        //reset default taskks end

        dispatch(setProgressReset())
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
        <div className="rules__button">

            {
                progressState === paginatedTasksdState.length && !defaultTaskState.some((value: any) => value.errorMessage) && <Button onClick={maskAnother} text="Mask another entities" />
            }

            {
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                defaultTaskState.some((value: any) => value.errorMessage) && <a className='log-button' download href='https://newdev2.crm4.dynamics.com//WebResources/uds_BusinessDataMaskingReprort?preview=1' >Download logs</a>
            }

            {
                stepState !== "progress" && <Button onClick={RunFunction} text="RUN" />
            }

            {
                stepState !== "error" && progressState === paginatedTasksdState.length && defaultTaskState.some((value: any) => value.errorMessage) && <Button onClick={goToChangeErrorsPage} text="Change setting" />
            }
        </div>
    )
}

export default React.memo(RulesFooter)