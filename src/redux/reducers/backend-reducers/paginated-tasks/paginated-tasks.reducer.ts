import { GET_PAGINATED_TASKS } from '../../../constants/backend-constants/default-tasks';
import { PaginatedStateTypes, DefaultTasksActionTypes } from '../default-tasks/default-tasks.types';
import { REFRESH } from '../../../constants/refresh'

const initialState: PaginatedStateTypes = {
    paginated: [].filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i),
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