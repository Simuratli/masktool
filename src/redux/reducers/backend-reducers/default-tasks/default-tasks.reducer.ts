import { GET_DEFAULT_TASKS } from '../../../constants/backend-constants/default-tasks';
import { DefaultTasksStateTypes, DefaultTasksActionTypes } from './default-tasks.types';

const initialState: DefaultTasksStateTypes = {
    tasks: [],
}

export const defaultTasksReducer = (state = initialState, action: DefaultTasksActionTypes) => {
    switch (action.type) {
        case GET_DEFAULT_TASKS:
            console.log("what i receive",action)
            return {
                ...state,
                tasks: action.payload
            }
        default:
            return { ...state }
    }
}   