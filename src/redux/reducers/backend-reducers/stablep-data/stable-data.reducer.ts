import { SET_STABLE_ENTITIES, SET_STABLE_TASKS, SET_STABLE_DATA_MAIN_NAME, SET_STABLE_DATA_LOGICALNAME, SET_STABLE_DATA_NAME, SET_STABLE_DATA_SEARCH_NAME, SET_STABLE_DATA_ETC } from '../../../constants/backend-constants/stable-data';
import { StableDataReducerStateTypes, StableDataReducerActionTypes } from './stable-data.types';

const initialState: StableDataReducerStateTypes = {
    tasks: [],
    entities: [],
    searchName: '',
    logicalName: '',
    mainName: '',
    name: '',
    etc: 0
}

export const stableDataReducer = (state = initialState, action: StableDataReducerActionTypes) => {
    switch (action.type) {
        case SET_STABLE_TASKS:
            return {
                ...state,
                tasks: action.payload
            }
        case SET_STABLE_ENTITIES:
            return {
                ...state,
                entities: [...state.entities, action.payload]
            }
        case SET_STABLE_DATA_MAIN_NAME:
            return {
                ...state,
                mainName: action.payload
            }
        case SET_STABLE_DATA_LOGICALNAME:
            return {
                ...state,
                logicalName: action.payload
            }
        case SET_STABLE_DATA_NAME:
            return {
                ...state,
                name: action.payload
            }
        case SET_STABLE_DATA_SEARCH_NAME:
            return {
                ...state,
                searchName: action.payload
            }
        case SET_STABLE_DATA_ETC:
            return {
                ...state,
                etc: action.payload
            }
        default:
            return { ...state }
    }
}   