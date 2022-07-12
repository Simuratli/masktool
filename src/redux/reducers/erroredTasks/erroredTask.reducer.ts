import { SET_ERRORED_DATA, SET_ALL_ERRORED_DATA } from '../../constants/errorerdDefaultTasks'
import { DefaultTasksActionTypes, DefaultTasksStateTypes } from '../backend-reducers/default-tasks/default-tasks.types'
import { REFRESH } from '../../constants/refresh'

const initialState: DefaultTasksStateTypes = {
    tasks: []
}

export const erroredTaskReducer = (state = initialState, action: DefaultTasksActionTypes) => {
    switch (action.type) {
        case SET_ERRORED_DATA:
            return {
                ...state,
                tasks: [...state.tasks, action.payload].filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.entityName === v.entityName)) === i)
            }
        case REFRESH:
            return {
                tasks: []
            }
        case SET_ALL_ERRORED_DATA:
            return {
                ...state,
                tasks: action.payload
            }
        default:
            return { ...state }
    }
}   