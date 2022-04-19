import React, { useState, useCallback } from 'react'
import Select from '../Select'
import Icon from './icon'
import NextPrevButtons from './NextPrevButtons'

function Pagination() {

    let Pages = [5, 10, 20, 'All']
    let pageCountMain = 100

    const [page, setPage] = useState({
        range: 5,
        rangeView: 5,
        current: 1,
        pageCount: pageCountMain / 5
    })

    let selectRange = useCallback(
        (event) => {
            event.target.textContent !== "All" ?
                setPage((prev) => ({ ...prev, rangeView: event.target.textContent, range: event.target.textContent, pageCount: pageCountMain / Number(event.target.textContent) }))
                :
                setPage((prev) => ({ ...prev, rangeView: event.target.textContent, range: pageCountMain, pageCount: 1 }));


            if (page.current > page.pageCount) setPage((prev) => ({ ...prev, current: 1 }));
        },
        [page, pageCountMain],
    )


    let Pagination_options = Pages.map((page) => {
        return <div onClick={selectRange} key={page} className="select__dropdown__element">
            <span className="select__dropdown__element__text">{page}</span>
        </div>
    })


    return (
        <div className='pagination'>
            <div className="pagination__text">Rows per page</div>
            <Select placeholder={`${page.current}-${page.rangeView}`} type="small" customData={Pagination_options} />
            <div className="pagination__text">of {page.pageCount}</div>
            <NextPrevButtons type="prev" setPage={setPage} disabled={page.current === 1} />
            <NextPrevButtons type="next" setPage={setPage} disabled={page.current >= page.pageCount} />
        </div>
    )
}

export default React.memo(Pagination)