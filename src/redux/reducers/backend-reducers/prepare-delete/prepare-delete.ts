import { PREPARE_ENTITES_FOR_DELETE, PREPARE_ENTITES_FOR_DELETE_PULL, PREPARE_ENTITES_FOR_DELETE_ALL } from '../../../constants/backend-constants/prepare-entities-for-delete';
import { PreparedDeleteEntitesStateTypes } from './prepare-delete.types'

const initialState: PreparedDeleteEntitesStateTypes = {
    delete: [],
}

var arr: any = [],
    arrIndex: any = {};

export const preParedDeleteEntites = (state = initialState, action: any) => {
    switch (action.type) {
        case PREPARE_ENTITES_FOR_DELETE:
            var index = arrIndex[action.payload.filterViewId];
            if (index === undefined) {
                index = arr.length;
                arrIndex[action.payload.filterViewId] = index;
            }
            arr[index] = action.payload;
            return {
                ...state,
                delete: arr
            }
        case PREPARE_ENTITES_FOR_DELETE_PULL:
            return {
                ...state,
                delete: state.delete.filter((item: any) => item.filterViewId !== action.payload)
            }
        case PREPARE_ENTITES_FOR_DELETE_ALL:
            return {
                ...state,
                delete: action.payload
            }
        default:
            return { ...state }
    }
}   