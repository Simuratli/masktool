import React, { useEffect, useState } from 'react';
import ProgressLoader from '../../ProgressLoader';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../redux/reducers/reducer.types'
import { SuccessIcon } from './icons'



function MultipleProgressBar({ progress, name, errorMessage, errorText, item, successRecords, totalRecords }: any) {
    const [progressNumber, setprogressNumber] = useState(successRecords ? (Number(successRecords) * 100 / Number(totalRecords)) : 0)
    const stepState = useSelector((state: ReducerType) => state.stepReducer);
    console.log(item, 'anlabeniiiiiiii')
    useEffect(() => {

        // setprogressNumber(10)

        // setprogressNumber((prev) => prev + (Number(successRecords) * 100 / Number(totalRecords)))
        if (errorMessage === false) {
            setprogressNumber(100)

        }

        // if (errorMessage === true) {
        //     setprogressNumber(99)
        // }


    }, [progress, errorMessage, successRecords, totalRecords])

    return (
        <div className='container_for_multiprogres'>
            <div className={`multiple__progress__bar ${errorMessage && "error"}`}>
                <div style={{display:"inline-block"}} className={`multiple__progress__bar__name multiple__progress__bar__name${(errorMessage === null || errorMessage === undefined) ? "" : (errorMessage === true ? '--error' : '--success')}`}>{name}</div>
                {item.errortext ? <div style={{ position: "relative", top: "-5px", fontSize: 12 }} className='danger'>{item.errortext}</div> : (progressNumber === 100 ? <div style={{ position: "relative", top: "-5px", fontSize: 12 }}>{item.maskOperation ? `${successRecords} records were masked` : `${successRecords} records were deleted`}</div> : (stepState.step === 'progress' ? <ProgressLoader bgcolor={`${errorMessage ? '#CE1E1E' : '#80BB5B'}`} completed={progressNumber} /> : <div style={{ display: "inline-block", marginLeft: 10, fontSize: 12 }}>{item.maskOperation ? `You are going to mask ${successRecords} records` : `You are going to delete  ${successRecords} records`}</div>))}
            </div>
            <SuccessIcon style={{ position: 'absolute', right: '-15px' }} noDrop success={errorMessage} />
        </div>
    )
}

export default MultipleProgressBar