import React, { useCallback } from 'react'
import Icon from './icon'
import { NextPrevButtonPropTypes } from './pagination.types'



function NextPrevButtons({ setPage, type, disabled }: NextPrevButtonPropTypes) {

    let changePage = useCallback(
        (type) => {
            console.log(type)
            switch (type) {
                case 'prev':
                    setPage((prev) => ({ ...prev, current: prev.current - 1 }))
                    break;
                case 'next':
                    setPage((prev) => ({ ...prev, current: prev.current + 1 }))
                    break;
            }
        },
        [],
    )


    return (
        <button onClick={() => { changePage(type) }} disabled={disabled} className="pagination__button">
            <Icon type={type} />
        </button>
    )
}

export default React.memo(NextPrevButtons)