import { Navbar, Progress, Footer } from '../../components'
import { Notification, Tutorial } from '../../containers'
import React from 'react'


function Main() {
  return (
    <div className='main__container'>
      <Navbar />
      <Progress />
      <Notification />
      <Tutorial />
      <Footer />
    </div>
  )
}

export default React.memo(Main)