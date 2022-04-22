import { GET_ALL_ENTITIES } from '../../../constants/backend-constants/get-entities';
import { GetEntitiesReducerStateTypes, GetEntitiesReducerActionTypes } from './get-entities.types';

const initialState: GetEntitiesReducerStateTypes = {
    entities: [],
}

export const getEntitiesReducer = (state = initialState, action: GetEntitiesReducerActionTypes) => {
    switch (action.type) {
        case GET_ALL_ENTITIES:
            return {
                ...state,
                entities: action.payload
            }
        default:
            return { ...state }
    }
}   