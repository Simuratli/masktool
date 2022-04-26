import { GET_VIEWS_BY_ENTITY, GET_ALL_VIEWS_BY_ENTITY } from '../../../constants/backend-constants/views-by-entity';
import { EntityByViewStateTypes, EntityByViewActionsTypes } from './entity-by-view.types';

const initialState: EntityByViewStateTypes = {
    entities: [],
}

export const getEntitiesByViewReducer = (state = initialState, action: EntityByViewActionsTypes) => {
    switch (action.type) {
        case GET_VIEWS_BY_ENTITY:
            return {
                ...state,
                entities: [...state.entities, action.payload]
            }
        case GET_ALL_VIEWS_BY_ENTITY:
            return {
                ...state,
                entities: action.payload
            }
        default:
            return { ...state }
    }
}   