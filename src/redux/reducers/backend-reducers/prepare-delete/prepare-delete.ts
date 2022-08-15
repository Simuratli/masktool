import { PREPARE_ENTITES_FOR_DELETE, PREPARE_ENTITES_FOR_DELETE_PULL, PREPARE_ENTITES_FOR_DELETE_ALL } from '../../../constants/backend-constants/prepare-entities-for-delete';
import { PreparedDeleteEntitesStateTypes } from './prepare-delete.types'
import { REFRESH } from '../../../constants/refresh'

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
            

            // console.log('PREPARE_ENTITES_FOR_DELETE iamurunun', state.delete)
            // console.log('PREPARE_ENTITES_FOR_DELETE iamurunun action.payload', action.payload )
            return {
                ...state,
                delete: [...state.delete, action.payload].filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.filterViewId === v.filterViewId)) === i)
            }
        case PREPARE_ENTITES_FOR_DELETE_PULL:
            console.log('PREPARE_ENTITES_FOR_DELETE_PULL iamurunun', action.payload)
            return {
                ...state,
                delete: state.delete.filter((item: any) => item.filterViewId !== action.payload)
            }
        case REFRESH:
            arr = []
            arrIndex = {};
            return {
                ...state,
                delete: []
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