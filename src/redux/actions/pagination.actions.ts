import { SET_CURRENT_PAGE, SET_PAGINATION_RANGE } from '../constants/pagination';

export const setCurrentPage = (payload:number) => {
    return{
        type:SET_CURRENT_PAGE,
        payload
    }
}


export const setPaginationRange = (payload:number) => {
    return{
        type:SET_PAGINATION_RANGE,
        payload
    }
}