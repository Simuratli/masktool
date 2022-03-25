import { Navbar, Progress, Footer } from '../../components'
import { Notification, Tutorial } from '../../containers'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'


function Main() {

  const stepState = useSelector((state: any) => state.stepReducer)
  const [component, setComponent] = useState<React.ReactNode>(<Notification />)

  useEffect(() => {
    switch (stepState.step) {
      case "main":
        setComponent(<Notification />)
        break;
      case "tutorial":
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