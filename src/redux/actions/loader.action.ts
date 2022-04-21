import { SET_TOGGLE_LOADER } from '../constants/loader'

export const setLoader = (payload:boolean ) => ({
    type: SET_TOGGLE_LOADER,
    payload
})