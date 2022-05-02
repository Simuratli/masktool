import React, { useCallback } from 'react'
import Icon from './icon'
import { NextPrevButtonPropTypes } from './pagination.types'
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { setCurrentPage } from '../../redux/actions';


function NextPrevButtons({ setPage, type, disabled }: NextPrevButtonPropTypes) {
    const dispatch = useDispatch();
    const paginationState = useSelector((state: ReducerType) => state.paginationReducer)


    let changePage = useCallback(
        (type) => {
            switch (type) {
                case 'prev':
                    dispatch(setCurrentPage(paginationState.current - 1))
                    break;
                case 'next':
                    dispatch(setCurrentPage(paginationState.current + 1))
                    break;
            }
        },
        [paginationState],
    )


    return (
        <button onClick={() => { changePage(type) }} disabled={disabled} className="pagination__button">
            <Icon type={type} />
        </button>
    )
}

export default React.memo(NextPrevButtons)