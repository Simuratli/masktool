import React from 'react'
import { Settings } from './icons'
import { ProgresSettingsPropTypes } from '../progress.types'

function ProgressSettings({ stepState }: ProgresSettingsPropTypes) {

    return (
        <div className={`progress__settings`}>
            <svg width="6" height="71" viewBox="0 0 6 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.2793 0.5H0.279297V35V70.5H5.2793V35V0.5Z" fill="#EBECEE" />
            </svg>
            <div className="progress__settings__icon">
                <Settings />
            </div>
        </div>
    )
}

export default React.memo(ProgressSettings)