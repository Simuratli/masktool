import React from 'react'
import { Header, Button } from '../../components'
import { TutorialDropdown } from '../'
import { useSelector, useDispatch } from 'react-redux'
import { ReducerType } from '../../redux/reducers/reducer.types'
import { tutorialText } from './tutorial.data'
import { setStep } from '../../redux/actions'

function Tutorial() {
    const notificationState = useSelector((state: ReducerType) => state.notificationReducer)
    const dispatch = useDispatch()



    return (
        <section>

            {/* <TutorialDropdown/> */}
            
            <div className="tutorial">
                <Header
                    text="How to use it"
                    headerType="big"
                />
                {
                    tutorialText.map((item, index) => {
                        return <p key={index} className='tutorial__text'>
                            {item}
                        </p>
                    })
                }
                <div className="tutorial__video">
                    <iframe width="674" height="418" src="https://www.youtube.com/embed/PHklnuOvxfg" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>

                <div className="tutorial__button">
                    <Button onClick={() => { dispatch(setStep("rules")) }} disabled={!notificationState.approveAgreement} text="Next" />
                </div>
            </div>
        </section>
    )
}

export default React.memo(Tutorial)