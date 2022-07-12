import { PROGRESS_ADD, RESET_PROGRESS } from '../../constants/progress';
import { ProgressActionTypes, ProgressStateTypes } from './progress.types';
import { REFRESH } from '../../constants/refresh'

const initialState: ProgressStateTypes = {
    number: 0
}

export const paginationReducer = (state = initialState, action: ProgressActionTypes) => {
    switch (action.type) {
        case PROGRESS_ADD:
            return {
                ...state,
                number: action.payload
            }
        case REFRESH:
            return {
                number: 0
            }
        case RESET_PROGRESS:
            return {
                ...state,
                number: 0
            }
        default:
            return { ...state }
    }
}   