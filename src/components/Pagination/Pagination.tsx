import React, { useState, useCallback, useEffect } from 'react';
import Select from '../Select';
import NextPrevButtons from './NextPrevButtons';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { setPaginationRange } from '../../redux/actions';

function Pagination() {
    const dispatch = useDispatch();
    const paginationState = useSelector((state: ReducerType) => state.paginationReducer)
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer)
    const [pageCountMain, setPageCountMain] = useState(defaultTasksState.tasks.length)

    const [page, setPage] = useState({
        rangeView: 5,
        pageCount: Math.floor(pageCountMain / 5) < pageCountMain / 5 ? Math.floor(pageCountMain / 5) + 1 : Math.floor(pageCountMain / 5)
    })

    let selectRange = useCallback(
        (event) => {
            event.target.textContent !== "All" ?
                <>{dispatch(setPaginationRange(event.target.textContent))} {setPage((prev) => ({ ...prev, rangeView: event.target.textContent, pageCount: pageCountMain < Number(event.target.textContent) ? 1 : (Math.floor(pageCountMain / event.target.textContent) < pageCountMain / event.target.textContent ? Math.floor(pageCountMain / event.target.textContent) + 1 : Math.floor(pageCountMain / 5)) }))}</>
                :
                <>{setPage((prev) => ({ ...prev, rangeView: event.target.textContent, pageCount: 1 }))} {dispatch(setPaginationRange(pageCountMain))}</>


            if (paginationState.current > page.pageCount) setPage((prev) => ({ ...prev, current: 1 }));
        },
        [page, pageCountMain, defaultTasksState],
    )

    useEffect(() => {
        setPageCountMain(defaultTasksState.tasks.length)
        setPage((prev) => ({
            ...prev,
            pageCount: Math.floor(pageCountMain / paginationState.range) < pageCountMain / paginationState.range ? Math.floor(pageCountMain / paginationState.range) + 1 : Math.floor(pageCountMain / paginationState.range)
        }))

    }, [defaultTasksState])



    let Pagination_options = paginationState.pages.map((page) => {
        return <div onClick={selectRange} key={page} className="select__dropdown__element">
            <span className="select__dropdown__element__text">{page}</span>
        </div>
    })


    return (
        <div className='pagination'>
            <div className="pagination__text">Rows per page</div>
            <Select placeholder={`${paginationState.current}-${page.rangeView}`} type="small" customData={Pagination_options} />
            <div className="pagination__text">of {page.pageCount}</div>
            <NextPrevButtons type="prev" setPage={setPage} disabled={paginationState.current === 1} />
            <NextPrevButtons type="next" setPage={setPage} disabled={paginationState.current >= page.pageCount} />
        </div>
    )
}

export default React.memo(Pagination)