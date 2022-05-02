import { SET_TOGGLE_MODAL, SET_DELETED_ENTITY_NAME_FOR_MODAL, SET_MODAL_DELETED } from '../constants/modal'

export const setToggleModal = (payload: Boolean) => ({
    type: SET_TOGGLE_MODAL,
    payload
})


export const setNameOfDeletedEntityForModal = (payload: string) => ({
    type: SET_DELETED_ENTITY_NAME_FOR_MODAL,
    payload
})



export const setModalDeleted = (payload: boolean) => ({
    type: SET_MODAL_DELETED,
    payload
})