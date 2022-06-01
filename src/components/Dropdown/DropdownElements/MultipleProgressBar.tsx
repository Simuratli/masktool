import React, { useEffect, useState } from 'react';
import ProgressLoader from '../../ProgressLoader';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../redux/reducers/reducer.types'




function MultipleProgressBar({ progress, name }: any) {
    
    const viewsProgressReducerState = useSelector((state: ReducerType) => state.requestProgressReducer)
    const [progressNumber, setprogressNumber] = useState(0)


    useEffect(() => {
        if (progress === "START") {
            setprogressNumber(0)
        }

        if (progress === "END") {
            setInterval(() => setprogressNumber((prev) => (prev < 100 ? prev + 5 : prev)), 10);
        }

        return () => {
            setprogressNumber(0)
        }
    }, [progress])



    return (
        <div className='multiple__progress__bar'>
            <div className='multiple__progress__bar__name multiple__progress__bar__name--success'>{name}</div>
            <ProgressLoader bgcolor="#80BB5B" completed={progressNumber} />
        </div>
    )
}

export default MultipleProgressBar