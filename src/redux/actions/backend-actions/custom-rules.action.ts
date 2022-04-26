import { GET_CUSTOM_RULES } from '../../constants/backend-constants/custom-rules';
// import { DefaultTasksTypes } from '../../reducers/backend-reducers/default-tasks/default-tasks.types';

export const getCustomRules = (payload: any[]) => ({
    type: GET_CUSTOM_RULES,
    payload
})