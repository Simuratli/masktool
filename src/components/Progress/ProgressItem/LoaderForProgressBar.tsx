import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../redux/reducers/reducer.types'

function LoaderForProgressBar() {
  const progressState = useSelector((state: ReducerType) => state.progressReducer.number)
  const PaginationTasksReducer = useSelector((state: ReducerType) => state.paginatedTasksdReducer)
  const   paginatedTasksdState = useSelector((state: ReducerType) => state.paginatedTasksdReducer.paginated)
  const [divider, setdivider] = useState(paginatedTasksdState.length / 12)
  let count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]


  return (
    <div className={`divided__progress__loader ${(PaginationTasksReducer.paginated.some((value) => value.errorMessage) ? 'danger-bg' : 'nt')}`}>
      {
        console.log(progressState,paginatedTasksdState.length,'dasdasdasdasd')
      }
      {count.map((item) => {
        return <span className={`divided__progress__loader__item ${progressState !== 0 && (progressState === paginatedTasksdState.length && 'complated')}  ${item === 12 ? (progressState <= 12 * divider && progressState >= 11 * divider && (progressState  !==0 && "complated")) : progressState >= item * divider && (progressState  !==0 && "complated")}`}></span>
      })}
    </div>
  )
}

export default LoaderForProgressBar