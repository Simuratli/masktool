import React, { useEffect, useState } from 'react';
import ProgressLoader from '../../ProgressLoader';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../redux/reducers/reducer.types'
import { SuccessIcon } from './icons'



function MultipleProgressBar({ progress, name, errorMessage, errorText, item, successRecords, totalRecords }: any) {
    const [progressNumber, setprogressNumber] = useState(0)
    console.log(item,'anlabeniiiiiiii')
    useEffect(() => {

        // setprogressNumber(10)

        setprogressNumber((prev) => prev + (Number(successRecords) * 100 / Number(totalRecords)))
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
                <div className={`multiple__progress__bar__name multiple__progress__bar__name${(errorMessage === null || errorMessage === undefined) ? "" : (errorMessage === true ? '--error' : '--success')}`}>{name}</div>
                {item.errortext ? <div style={{ position: "relative", top: "-5px", fontSize: 12 }} className='danger'>{item.errortext}</div> : (progressNumber === 100 ? <div style={{ position: "relative", top: "-5px", fontSize: 12 }}>{item.maskOperation ? `${item.cells.filter((it: any) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields are masked` : 'Delete'}</div> : <ProgressLoader bgcolor={`${errorMessage ? '#CE1E1E' : '#80BB5B'}`} completed={progressNumber} />)}
            </div>
            <SuccessIcon noDrop success={errorMessage} />
        </div>
    )
}

export default MultipleProgressBar