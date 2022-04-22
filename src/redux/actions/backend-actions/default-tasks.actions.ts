import { GET_DEFAULT_TASKS } from '../../constants/backend-constants/default-tasks';
import { DefaultTasksTypes } from '../../reducers/backend-reducers/default-tasks/default-tasks.types';

export const setDefaultTasks = (payload: DefaultTasksTypes[]) => ({
    type: GET_DEFAULT_TASKS,
    payload
})