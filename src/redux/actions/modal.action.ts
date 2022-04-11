import { SET_TOGGLE_MODAL } from '../constants/modal'

export const setToggleModal = (payload:Boolean ) => ({
    type: SET_TOGGLE_MODAL,
    payload
})