import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navbar, Progress, Footer } from '../../components'
import { Notification, Tutorial, Rules, MaskingRules } from '../../containers'
import { ReducerType } from '../../redux/reducers/reducer.types'



function Main() {

  const stepState = useSelector((state: ReducerType) => state.stepReducer.step)
  const [component, setComponent] = useState<React.ReactNode>(<Notification />)

  useEffect(() => {
    switch (stepState) {
      case "notifications":
        setComponent(<Notification />)
        break;
      case "tutorial":
        setComponent(<Tutorial />)
        break;
      case "rules":
        setComponent(<Rules />)
        break;
      case "progress":
        setComponent(<Rules />)
        break;
      case "settings":
        setComponent(<Tutorial />)
        break;
      default:
        break;
    }
  }, [stepState])

  return (
    <div className='main__container'>
      <Navbar />
      <Progress />
      {component}
      <Footer />
    </div>
  )
}

export default React.memo(Main)