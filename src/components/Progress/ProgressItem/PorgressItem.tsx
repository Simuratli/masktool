
import React from 'react';
import { useDispatch } from 'react-redux';
import { ProgresItemPropTypes } from '../progress.types';
import { Dvider } from './';
import { setStep } from '../../../redux/actions';

function PorgressItem({ icon, text, id, disabled }: ProgresItemPropTypes) {
    const dispatch = useDispatch();

    const travelBetweenSteps = () => {
        disabled && dispatch(setStep(id));
    }

    return (
        <>
            <div onClick={travelBetweenSteps} className={`progress__item ${!disabled && 'progress__item--disable'}`}>
                <span className='progress__item__text'>{text}</span>
                {icon}
            </div>
            {id !== "done" && <Dvider />}
        </>
    )
}

export default React.memo(PorgressItem)