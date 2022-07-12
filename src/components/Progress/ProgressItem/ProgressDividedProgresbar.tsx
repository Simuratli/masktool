import React from 'react'
import LoaderForProgressBar from './LoaderForProgressBar';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../redux/reducers/reducer.types';
import { Success, Error } from './icons'


function ProgressDividedProgresbar() {
    const progressState = useSelector((state: ReducerType) => state.progressReducer.number)
    const paginatedTasksdState = useSelector((state: ReducerType) => state.paginatedTasksdReducer.paginated)
    const PaginationTasksReducer = useSelector((state: ReducerType) => state.paginatedTasksdReducer)

    return (
        <div className='progress__info'>
            <div className='progress__info__bar'>
                <p className='progress__info__text'>{progressState} of {paginatedTasksdState.length} are masked</p>
                <LoaderForProgressBar />
            </div>

            <div className="progress__info__buttons">
                {progressState === paginatedTasksdState.length && (PaginationTasksReducer.paginated.some((value) => value.errorMessage) ? <Error /> : <Success />)}
            </div>
        </div>
    )
}

export default React.memo(ProgressDividedProgresbar)