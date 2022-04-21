import { GET_DEFAULT_TASKS } from '../../constants/backend-constants/default-tasks';

export const setDefaultTasks = (payload: boolean) => ({
    type: GET_DEFAULT_TASKS,
    payload
})