import { ProgressItem } from './ProgressItem'
import { progressData } from './progressdata'

function Progress() {
  return (
    <div className='progress'>
      {
        progressData.map((item) => {
          return <ProgressItem
            disabled={item.id === 0 ? false : true}
            key={item.id}
            id={item.id}
            icon={item.icon === "button" ? <button  disabled={true} className='progress__upload__button'>Upload</button> : <span className='progress__item__icon' dangerouslySetInnerHTML={{ __html: item.icon }}></span>}
            text={item.text}
          />
        })
      }
    </div>
  )
}

export default Progress