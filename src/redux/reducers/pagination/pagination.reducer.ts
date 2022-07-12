import { SET_CURRENT_PAGE, SET_PAGINATION_RANGE } from '../../constants/pagination'
import { PaginationStateTypes, PaginationActionTypes } from './pagination.types'
import { REFRESH } from '../../constants/refresh'

const initialState: PaginationStateTypes = {
    current: 1,
    range: 12,
    pages: [12, 24, 36, 'All']
}

export const paginationReducer = (state = initialState, action: PaginationActionTypes) => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {
                ...state,
                current: action.payload
            }
        case REFRESH:
            return {
                current: 1,
                range: 12,
                pages: [12, 24, 36, 'All']
            }
        case SET_PAGINATION_RANGE:
            return {
                ...state,
                range: action.payload
            }
        default:
            return { ...state }
    }
}   