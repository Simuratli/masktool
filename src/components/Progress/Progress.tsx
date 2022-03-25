import { ProgressItem } from './ProgressItem'
import { progressData } from './progressdata'
import { useSelector } from 'react-redux'
import { useEffect,useState } from 'react'
function Progress() {
  const stepState = useSelector((state: any) => state.stepReducer)
  const [disable, setdisable] = useState<String[]>()
  
  useEffect(() => {
    let index = progressData.findIndex(x => x.id === stepState.step)
    let newProgressArray = progressData.slice(index + 1, progressData.length)
    
    let disabledBar = newProgressArray.map((item) => {
      return item.id
    })

    setdisable(disabledBar)

  }, [stepState])



  return (
    <div className='progress'>
      {
        progressData.map((item) => {
          return <ProgressItem
            disabled={disable}
            key={item.id}
            id={item.id}
            icon={item.icon === "button" ? <button disabled={true} className='progress__upload__button'>Upload</button> : <span className='progress__item__icon' dangerouslySetInnerHTML={{ __html: item.icon }}></span>}
            text={item.text}
          />
        })
      }
    </div>
  )
}

export default Progress