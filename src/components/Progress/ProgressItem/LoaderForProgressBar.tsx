import React from 'react'

function LoaderForProgressBar() {
  return (
    <div className='divided__progress__loader'>
        <span className="divided__progress__loader__item complated"></span>
        <span className="divided__progress__loader__item complated"></span>
        <span className="divided__progress__loader__item complated"></span>
        <span className="divided__progress__loader__item"></span>
        <span className="divided__progress__loader__item"></span>
        <span className="divided__progress__loader__item"></span>
        <span className="divided__progress__loader__item"></span>
        <span className="divided__progress__loader__item"></span>
        <span className="divided__progress__loader__item"></span>
        <span className="divided__progress__loader__item"></span>
        <span className="divided__progress__loader__item"></span>
        <span className="divided__progress__loader__item"></span>
    </div>
  )
}

export default React.memo(LoaderForProgressBar)