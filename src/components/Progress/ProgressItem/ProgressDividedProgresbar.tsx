import React from 'react'
import LoaderForProgressBar from './LoaderForProgressBar';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../redux/reducers/reducer.types';
import { Success } from './icons'


function ProgressDividedProgresbar() {
    const progressState = useSelector((state: ReducerType) => state.progressReducer.number)
    const paginatedTasksdState = useSelector((state: ReducerType) => state.paginatedTasksdReducer.paginated)

    return (
        <div className='progress__info'>
            <div className='progress__info__bar'>
                <p className='progress__info__text'>{progressState} of {paginatedTasksdState.length} are masked</p>
                <LoaderForProgressBar />
            </div>

            <div className="progress__info__buttons">
                {progressState === paginatedTasksdState.length && <Success />}
            </div>
        </div>
    )
}

export default React.memo(ProgressDividedProgresbar)