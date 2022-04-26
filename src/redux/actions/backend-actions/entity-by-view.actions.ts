import { GET_VIEWS_BY_ENTITY, GET_ALL_VIEWS_BY_ENTITY } from '../../constants/backend-constants/views-by-entity';
import { EntityByViewMainType, } from '../../reducers/backend-reducers/entity-by-view/entity-by-view.types';

export const setViewsByEntity = (payload: EntityByViewMainType) => ({
    type: GET_VIEWS_BY_ENTITY,
    payload
})

export const setAllViewsByEntity = (payload: EntityByViewMainType[]) => ({
    type: GET_ALL_VIEWS_BY_ENTITY,
    payload
})