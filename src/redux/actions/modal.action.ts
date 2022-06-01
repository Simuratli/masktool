import { SET_TOGGLE_MODAL, SET_DELETED_ENTITY_NAME_FOR_MODAL, SET_MODAL_DELETED, SET_MODAL_ACTIONS_ALLOW, SET_TOGGLE_MODAL_ACTIONS, SET_MODAL_ADD_ENTITY, SET_MODAL_ADD_FIELD } from '../constants/modal'

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


export const setModalToggleActions = (payload: boolean) => ({
    type: SET_TOGGLE_MODAL_ACTIONS,
    payload
})


export const setModaleActionsAllow = (payload: boolean) => ({
    type: SET_MODAL_ACTIONS_ALLOW,
    payload
})

export const setModalAddEntity = (payload: boolean) => ({
    type: SET_MODAL_ADD_ENTITY,
    payload
})

export const setModalAddField = (payload: boolean) => ({
    type: SET_MODAL_ADD_FIELD,
    payload
})