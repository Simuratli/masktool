import React, { useEffect, useState } from 'react';
import ProgressLoader from '../../ProgressLoader';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../redux/reducers/reducer.types'




function MultipleProgressBar({ progress, name, errorMessage }: any) {

    const viewsProgressReducerState = useSelector((state: ReducerType) => state.requestProgressReducer)
    const [progressNumber, setprogressNumber] = useState(0)
    console.log(errorMessage, 'errorMessage')

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
        <div className={`multiple__progress__bar ${errorMessage && "error"}`}>
            <div className={`multiple__progress__bar__name multiple__progress__bar__name${errorMessage ? '--error' : '--success'}`}>{name}</div>
            <ProgressLoader bgcolor={`${errorMessage ? '#CE1E1E' : '#80BB5B'}`} completed={progressNumber} />
        </div>
    )
}

export default MultipleProgressBar