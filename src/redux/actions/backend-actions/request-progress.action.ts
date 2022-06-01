import { CURRENT_REQUEST, OLD_REQUEST } from '../../constants/backend-constants/request-progress';


export const setCurrentRequest = (payload: any) => ({
    type: CURRENT_REQUEST,
    payload
})

export const setOldRequest = (payload: any) => ({
    type: OLD_REQUEST,
    payload
})