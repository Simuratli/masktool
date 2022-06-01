import { PREPARE_ENTITES_FOR_DELETE, PREPARE_ENTITES_FOR_DELETE_PULL,PREPARE_ENTITES_FOR_DELETE_ALL } from '../../constants/backend-constants/prepare-entities-for-delete';

export const prepareEntitiesForDelete = (payload: any) => ({
    type: PREPARE_ENTITES_FOR_DELETE,
    payload
})


export const prepareEntitiesForDeleteItemsFromArray = (payload: any) => ({
    type: PREPARE_ENTITES_FOR_DELETE_PULL,
    payload
})


export const prepareEntitiesForDeleteItemsPutThemAll = (payload: any) => ({
    type: PREPARE_ENTITES_FOR_DELETE_ALL,
    payload
})

