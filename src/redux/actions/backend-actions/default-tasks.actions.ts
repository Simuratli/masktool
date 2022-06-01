import { GET_DEFAULT_TASKS, GET_PAGINATED_TASKS } from '../../constants/backend-constants/default-tasks';
import { DefaultTasksTypes } from '../../reducers/backend-reducers/default-tasks/default-tasks.types';

export const setDefaultTasks = (payload: DefaultTasksTypes[]) => ({
    type: GET_DEFAULT_TASKS,
    payload
})


export const setPaginatedTasks = (payload: DefaultTasksTypes[]) => ({
    type: GET_PAGINATED_TASKS,
    payload
})