import { CURRENT_REQUEST, OLD_REQUEST } from '../../../constants/backend-constants/request-progress';
import { requestProgressStateTypes } from './requestProgress.types';
import { REFRESH } from '../../../constants/refresh'

const initialState: requestProgressStateTypes = {
    current: null,
    oldRequests: []
}

export const requestProgressReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CURRENT_REQUEST:
            return {
                ...state,
                current: action.payload
            }
        case REFRESH:
            return {
                current: null,
                oldRequests: []
            }
        case OLD_REQUEST:
            return {
                ...state,
                oldRequests: [...state.oldRequests, action.payload]
            }
        default:
            return { ...state }
    }
}   