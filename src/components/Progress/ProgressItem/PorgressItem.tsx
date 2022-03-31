import { Dvider } from './'
import React from 'react'
import { ProgresItemPropTypes } from '../progress.types'
import { useDispatch } from 'react-redux'
import { setStep } from '../../../redux/actions'

function PorgressItem({ icon, text, id, disabled }: ProgresItemPropTypes) {
    const dispatch = useDispatch()
    const travelBetweenSteps = () => {
        !disabled?.includes(id) && dispatch(setStep(id))
    }

    return (
        <>
            <div onClick={travelBetweenSteps} className={`progress__item ${disabled?.includes(id) && 'progress__item--disable'}`}>
                <span className='progress__item__text'>{text}</span>
                {icon}
            </div>
            {id !== "done" && <Dvider />}
        </>
    )
}

export default React.memo(PorgressItem)