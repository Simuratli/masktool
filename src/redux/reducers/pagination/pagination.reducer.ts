import { SET_CURRENT_PAGE, SET_PAGINATION_RANGE } from '../../constants/pagination'
import { PaginationStateTypes, PaginationActionTypes } from './pagination.types'

const initialState: PaginationStateTypes = {
    current: 1,
    range: 5,
    pages:[5, 10, 20, 'All']
}

export const paginationReducer = (state = initialState, action: PaginationActionTypes) => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {
                ...state,
                current: action.payload
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