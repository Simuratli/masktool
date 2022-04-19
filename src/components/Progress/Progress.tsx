import React, { useEffect, useState } from 'react'
import { ProgressItem } from './ProgressItem'
import { progressData } from './progressdata'
import { useSelector } from 'react-redux'
import { ReducerType } from '../../redux/reducers/reducer.types'
import { ProgresStateTypes } from './progress.types'


function Progress() {
  const stepState = useSelector((state: ReducerType) => state.stepReducer.step)

  const [progressBar, setProgressBar] = useState<ProgresStateTypes[]>([])

  useEffect(() => {
    let newProgressBar = progressData.map((item) => {
      if (item.id === stepState) {
        item.disabled = true
      }
      return item
    })
    setProgressBar(newProgressBar)
  }, [stepState])



  return (
    <div className='progress'>
      {
        progressBar.map((item) => {
          return <ProgressItem
            disabled={item.disabled}
            key={item.id}
            id={item.id}
            icon={<span className='progress__item__icon' dangerouslySetInnerHTML={{ __html: item.icon }}></span>}
            text={item.text}
          />
        })
      }
      <div className="progress__settings">
        <svg width="6" height="71" viewBox="0 0 6 71" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.2793 0.5H0.279297V35V70.5H5.2793V35V0.5Z" fill="#EBECEE" />
        </svg>
        <div className="progress__settings__icon">
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.1499 0.75C10.8838 0.75846 11.615 0.843262 12.3314 1.00304C12.6441 1.07279 12.878 1.33351 12.9135 1.65196L13.0837 3.17881C13.1608 3.87986 13.7527 4.41084 14.4583 4.41158C14.648 4.41188 14.8356 4.37238 15.0109 4.29483L16.4115 3.67956C16.7028 3.55159 17.0432 3.62136 17.2606 3.85362C18.2728 4.93464 19.0266 6.23115 19.4654 7.64558C19.56 7.95058 19.4511 8.28203 19.1941 8.4715L17.9526 9.38659C17.5984 9.64679 17.3893 10.06 17.3893 10.4995C17.3893 10.9389 17.5984 11.3521 17.9534 11.6129L19.1959 12.5283C19.453 12.7177 19.562 13.0492 19.4674 13.3543C19.0288 14.7685 18.2754 16.0649 17.2638 17.1461C17.0466 17.3783 16.7065 17.4483 16.4152 17.3206L15.0088 16.7045C14.6065 16.5284 14.1445 16.5542 13.7642 16.774C13.384 16.9937 13.131 17.3812 13.0826 17.8177L12.9136 19.3444C12.8787 19.6592 12.6498 19.9182 12.3417 19.9915C10.8933 20.3361 9.38418 20.3361 7.93573 19.9915C7.6276 19.9182 7.39874 19.6592 7.36388 19.3444L7.19506 17.82C7.14547 17.3843 6.89204 16.998 6.51212 16.779C6.1322 16.56 5.6709 16.5343 5.2699 16.7094L3.86327 17.3256C3.57192 17.4533 3.23173 17.3833 3.01448 17.1509C2.00232 16.0685 1.24889 14.7705 0.810896 13.3548C0.716557 13.0499 0.825557 12.7186 1.08254 12.5293L2.32587 11.6133C2.68001 11.3531 2.88917 10.9399 2.88917 10.5005C2.88917 10.061 2.68001 9.64779 2.32541 9.38725L1.08286 8.47285C0.825491 8.28345 0.716392 7.95178 0.811063 7.64658C1.24981 6.23215 2.00364 4.93564 3.01582 3.85462C3.23329 3.62236 3.57363 3.55259 3.86494 3.68056L5.26532 4.29572C5.66826 4.47256 6.1315 4.44585 6.51347 4.22269C6.89379 4.00209 7.14698 3.61422 7.19586 3.17764L7.36594 1.65196C7.40146 1.33335 7.63556 1.07254 7.9485 1.00294C8.66577 0.84342 9.39765 0.758654 10.1499 0.75ZM10.1501 2.2499C9.69602 2.25524 9.24325 2.29443 8.79552 2.36702L8.68659 3.34418C8.58476 4.25368 8.05773 5.06102 7.26812 5.51903C6.47367 5.98317 5.50506 6.03903 4.66228 5.66917L3.76399 5.27456C3.19206 5.96873 2.73684 6.75135 2.41622 7.59168L3.21402 8.17879C3.95283 8.72162 4.38917 9.58367 4.38917 10.5005C4.38917 11.4172 3.95283 12.2793 3.21479 12.8215L2.41574 13.4102C2.73608 14.252 3.19137 15.0361 3.7637 15.7316L4.66883 15.3351C5.50692 14.9692 6.46894 15.0227 7.26122 15.4794C8.05351 15.9361 8.58202 16.7417 8.68569 17.6526L8.79465 18.6365C9.68429 18.7878 10.5932 18.7878 11.4828 18.6365L11.5918 17.6527C11.6925 16.7421 12.2204 15.9337 13.0137 15.4753C13.8069 15.0168 14.7709 14.963 15.6105 15.3305L16.5149 15.7267C17.0867 15.0323 17.5418 14.2495 17.8624 13.409L17.0644 12.8211C16.3256 12.2783 15.8893 11.4162 15.8893 10.4995C15.8893 9.58267 16.3256 8.72062 17.0635 8.17847L17.8604 7.59109C17.5398 6.75061 17.0845 5.96784 16.5125 5.27356L15.616 5.66737C15.2507 5.82901 14.8555 5.9122 14.4564 5.91158C12.9867 5.91004 11.7532 4.80355 11.5928 3.34383L11.4839 2.3667C11.0384 2.2942 10.5903 2.25512 10.1501 2.2499ZM10.1374 6.74995C12.2085 6.74995 13.8874 8.42888 13.8874 10.5C13.8874 12.571 12.2085 14.25 10.1374 14.25C8.06632 14.25 6.38739 12.571 6.38739 10.5C6.38739 8.42888 8.06632 6.74995 10.1374 6.74995ZM10.1374 8.24995C8.89475 8.24995 7.88739 9.25731 7.88739 10.5C7.88739 11.7426 8.89475 12.75 10.1374 12.75C11.38 12.75 12.3874 11.7426 12.3874 10.5C12.3874 9.25731 11.38 8.24995 10.1374 8.24995Z" fill="#FF8F3E" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Progress)