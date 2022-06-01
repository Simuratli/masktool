import React from 'react';
import TableCell from './TableCell'
import { useDispatch, useSelector } from 'react-redux';
import { setModalAddField, setStableMainName, setStableName, setStableSearchName, setStableEtc, setStableEntityByViews } from '../../../redux/actions'
import { GetViewsByEntity } from '../../../api'

interface TableHeaderPropTypes {
    name: string | undefined,
    searchName: string | undefined,
    mainName: string | undefined,
    etc: number
}

function TableHeader({ name, searchName, mainName, etc }: TableHeaderPropTypes) {
    const dispatch = useDispatch()

    const openModal = async () => {
        dispatch(setModalAddField(true))
        dispatch(setStableMainName(mainName))
        dispatch(setStableName(name))
        dispatch(setStableSearchName(searchName))
        dispatch(setStableEtc(etc))
    }

    return (
        <>
            <div className='table__header'>
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
                <TableCell>Parameter rule</TableCell>
                <TableCell>no masking</TableCell>
                <TableCell>chosen data</TableCell>
            </div>
            <div className="table__header__shadow"></div>
        </>
    )
}

export default TableHeader