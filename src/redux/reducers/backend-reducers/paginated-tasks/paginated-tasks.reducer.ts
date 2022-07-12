import { GET_PAGINATED_TASKS } from '../../../constants/backend-constants/default-tasks';
import { PaginatedStateTypes, DefaultTasksActionTypes } from '../default-tasks/default-tasks.types';
import { REFRESH } from '../../../constants/refresh'

const initialState: PaginatedStateTypes = {
    paginated: [],
}

export const paginatedTasksReducer = (state = initialState, action: DefaultTasksActionTypes) => {
    switch (action.type) {
        case GET_PAGINATED_TASKS:
            return {
                ...state,
                paginated: action.payload
            }
        case REFRESH:
            return {
                ...state,
                paginated: []
            }
        default:
            return { ...state }
    }
}   