import { SET_TOGGLE_MODAL, SET_DELETED_ENTITY_NAME_FOR_MODAL, SET_MODAL_DELETED, SET_MODAL_ACTIONS_ALLOW, SET_TOGGLE_MODAL_ACTIONS, SET_MODAL_ADD_ENTITY, SET_MODAL_ADD_FIELD } from '../../constants/modal';
import { ModalStateTypes, ModalActionTypes } from './modal.reducer.types';

const initialState: ModalStateTypes = {
    open: false,
    name: '',
    delete: false,
    runActionOpen: false,
    runActionAllow: false,
    addEntity: false,
    addFields: false
}

export const modalReducer = (state = initialState, action: ModalActionTypes) => {
    switch (action.type) {
        case SET_TOGGLE_MODAL:
            return {
                ...state,
                open: action.payload
            }
        case SET_DELETED_ENTITY_NAME_FOR_MODAL:
            return {
                ...state,
                name: action.payload
            }
        case SET_MODAL_DELETED:
            return {
                ...state,
                delete: action.payload
            }
        case SET_MODAL_ACTIONS_ALLOW:
            return {
                ...state,
                runActionAllow: action.payload
            }
        case SET_TOGGLE_MODAL_ACTIONS:
            return {
                ...state,
                runActionOpen: action.payload
            }
        case SET_MODAL_ADD_ENTITY:
            return {
                ...state,
                addEntity: action.payload
            }
        case SET_MODAL_ADD_FIELD:
            return {
                ...state,
                addFields: action.payload
            }
        default:
            return { ...state }
    }
}   