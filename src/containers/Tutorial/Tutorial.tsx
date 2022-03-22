import React from 'react'
import { Header, Button } from '../../components'
import { useSelector } from 'react-redux'
import { ReducerType } from '../../redux/reducers/reducer.types'

function Tutorial() {
    const notificationState = useSelector((state: ReducerType) => state.notificationReducer)
    console.log()
    return (
        <div className='tutorial'>
            <Header
                text="How to use it"
                headerType="big"
            />
            <p className='tutorial__text'>
                All system fields are subject to default masking rules. Check and change if necessary.
            </p>
            <p className='tutorial__text'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className='tutorial__text'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className='tutorial__text'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <div className="tutorial__video">
                <iframe width="674" height="418" src="https://www.youtube.com/embed/PHklnuOvxfg" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>

            <div className="tutorial__button">
                <Button disabled={!notificationState.approveAgreement} text="Next" />
            </div>
        </div>
    )
}

export default Tutorial