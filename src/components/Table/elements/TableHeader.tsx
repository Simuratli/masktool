import React from 'react';
import TableCell from './TableCell'
import { useDispatch, useSelector } from 'react-redux';
import { setModalAddField, setStableMainName, setStableName, setStableSearchName, setStableEtc, setStableLogicalName } from '../../../redux/actions'
import { GetViewsByEntity } from '../../../api'

interface TableHeaderPropTypes {
    name: string | undefined,
    searchName: string | undefined,
    mainName: string | undefined,
    etc: number,
    logicalName?: string
}

function TableHeader({ name, searchName, mainName, etc, logicalName }: TableHeaderPropTypes) {
    const dispatch = useDispatch()

    const openModal = async () => {
        dispatch(setModalAddField(true))
        dispatch(setStableMainName(mainName))
        console.log(name,'teteteetetetetette')
        dispatch(setStableName(name))
        dispatch(setStableLogicalName(logicalName))
        dispatch(setStableSearchName(searchName))
        dispatch(setStableEtc(etc))
    }

    return (
        <>
            <div className='table__row table-head'>
                <TableCell>
                    fields
                    <button onClick={openModal} className="plus">
                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="8" y="4.5" width="2" height="10" fill="#FEFEFF" />
                            <rect x="4" y="10.5" width="2" height="10" transform="rotate(-90 4 10.5)" fill="#FEFEFF" />
                        </svg>
                    </button>
                </TableCell>
                <TableCell>Masking rule</TableCell>
                <TableCell>Parameter</TableCell>
                {/* <TableCell>no masking</TableCell> */}
                <TableCell>chosen data</TableCell>
            </div>
            <div className="table__header__shadow"></div>
        </>
    )
}

export default TableHeader