import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../redux/reducers/reducer.types'

function LoaderForProgressBar() {
  const progressState = useSelector((state: ReducerType) => state.progressReducer.number)
  const PaginationTasksReducer = useSelector((state: ReducerType) => state.paginatedTasksdReducer.paginated)
  const [divider, setdivider] = useState(PaginationTasksReducer.length / 12)
  let count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]



  return (
    <div className='divided__progress__loader'>
      {count.map((item) => {
        return <span className={`divided__progress__loader__item ${item === 12 ? (progressState <= 12 * divider && progressState >= 11 * divider && "complated") : progressState >= item * divider && "complated"}`}></span>
      })}
    </div>
  )
}

export default React.memo(LoaderForProgressBar)