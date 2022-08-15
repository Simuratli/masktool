import React, { useState, useCallback, useEffect } from 'react';
import Select from '../Select';
import NextPrevButtons from './NextPrevButtons';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { setPaginationRange, setCurrentPage } from '../../redux/actions';
import WarningIcon from './warningIcon'

function Pagination() {
    const dispatch = useDispatch();
    const paginationState = useSelector((state: ReducerType) => state.paginationReducer)
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer)
    const [pageCountMain, setPageCountMain] = useState(defaultTasksState.tasks.length)
    const stepState = useSelector((state: ReducerType) => state.stepReducer);
    const erroredState = useSelector((state: ReducerType) => state.erroredTaskReducer);

    useEffect(() => {
        if (stepState.step === 'error') {
            dispatch(setPaginationRange(100000))
            setPage((prev) => ({
                ...prev,
                rangeView: 100000
            }))
            
        }

        if(stepState.step === 'rules'){
            dispatch(setPaginationRange(12))
            setPage((prev) => ({
                ...prev,
                rangeView: 12
            }))
        }
    }, [stepState.step])


    const [page, setPage] = useState({
        rangeView: 12,
        pageCount: Math.floor(pageCountMain / 12) < pageCountMain / 12 ? Math.floor(pageCountMain / 12) + 1 : Math.floor(pageCountMain / 12)
    })

    useEffect(() => {
        setPageCountMain(defaultTasksState.tasks.length)
        setPage((prev) => ({
            ...prev,
            pageCount: Math.floor(pageCountMain / paginationState.range) < pageCountMain / paginationState.range ? Math.floor(pageCountMain / paginationState.range) + 1 : Math.floor(pageCountMain / paginationState.range)
        }))

    }, [defaultTasksState])


    let Pagination_data = [12, 24, 36, 'All']

    const onChangePage = (event: string | null) => {
        dispatch(setCurrentPage(1))
        event !== "All" ?
            <>{dispatch(setPaginationRange(Number(event)))} {setPage((prev) => ({ ...prev, rangeView: Number(event), pageCount: pageCountMain < Number(event) ? 1 : (Math.floor(pageCountMain / Number(event)) < pageCountMain / Number(event) ? Math.floor(pageCountMain / Number(event)) + 1 : Math.floor(pageCountMain / 12)) }))}</>
            :
            <>{setPage((prev) => ({ ...prev, rangeView: Number(event), pageCount: 1 }))} {dispatch(setPaginationRange(pageCountMain))}</>


        if (paginationState.current > page.pageCount) setPage((prev) => ({ ...prev, current: 1 }));

    }

    return (
        <div className='pagination'>
            <div className="pagination__text">Rows per page</div>
            <Select pagination={paginationState.current} disabled={stepState.step !== 'rules'} onChange={onChangePage} placeholder={`${paginationState.current}-${stepState.step === "error" ? "All" : (paginationState.range === defaultTasksState.tasks.length ? (paginationState.range !== 12 ? "All" : paginationState.range) : paginationState.range )}`} type="small" data={Pagination_data} />
            <div className="pagination__text">of {page.pageCount}</div>
            <NextPrevButtons type="prev" setPage={setPage} disabled={paginationState.current === 1 || stepState.step !== 'rules'} />
            <NextPrevButtons type="next" setPage={setPage} disabled={paginationState.current >= page.pageCount || stepState.step !== 'rules'} />
            <div className="pagination_warning">
                <WarningIcon />
            </div>
        </div>
    )
}

export default React.memo(Pagination)