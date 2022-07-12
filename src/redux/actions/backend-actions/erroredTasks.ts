import { SET_ERRORED_DATA, SET_ALL_ERRORED_DATA } from '../../constants/errorerdDefaultTasks';
import { DefaultTasksTypes } from '../../reducers/backend-reducers/default-tasks/default-tasks.types';

export const setErroredTasks = (payload: DefaultTasksTypes) => ({
    type: SET_ERRORED_DATA,
    payload
})


export const setAllErroredTasks = (payload: DefaultTasksTypes[]) => ({
    type: SET_ALL_ERRORED_DATA,
    payload
})
