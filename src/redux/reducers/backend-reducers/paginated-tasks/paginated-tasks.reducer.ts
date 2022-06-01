import { GET_PAGINATED_TASKS } from '../../../constants/backend-constants/default-tasks';
import { PaginatedStateTypes, DefaultTasksActionTypes } from '../default-tasks/default-tasks.types';

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
        default:
            return { ...state }
    }
}   