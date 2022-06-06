import { SET_ERRORED_DATA } from '../../constants/errorerdDefaultTasks'
import { DefaultTasksActionTypes, DefaultTasksStateTypes } from '../backend-reducers/default-tasks/default-tasks.types'

const initialState: DefaultTasksStateTypes = {
    tasks: []
}

export const erroredTaskReducer = (state = initialState, action: DefaultTasksActionTypes) => {
    switch (action.type) {
        case SET_ERRORED_DATA:
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        default:
            return { ...state }
    }
}   