import React from 'react'
import { Info } from './icons'
import { useDispatch } from 'react-redux'
import { ProgresSettingsPropTypes } from '../progress.types';
import { setStep } from '../../../redux/actions'

function ProgressSettings({ stepState }: ProgresSettingsPropTypes) {
    const dispatch = useDispatch();


    return (
        <div className={`progress__settings ${stepState === "notifications" && 'disabled'}`}>
            <svg width="6" height="71" viewBox="0 0 6 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.2793 0.5H0.279297V35V70.5H5.2793V35V0.5Z" fill="#EBECEE" />
            </svg>
            <div onClick={() => {dispatch(setStep('tutorial'))}} className="progress__settings__icon">
                <Info />
            </div>
        </div>
    )
}

export default React.memo(ProgressSettings)