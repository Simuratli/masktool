import { GET_ALL_ENTITIES } from '../../constants/backend-constants/get-entities';
import { AllEntitiesTypes } from '../../reducers/backend-reducers/get-entities/get-entities.types';

export const setAllEntities = (payload: AllEntitiesTypes[]) => ({
    type: GET_ALL_ENTITIES,
    payload
})