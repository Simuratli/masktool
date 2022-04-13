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
    </div>
  )
}

export default React.memo(Progress)