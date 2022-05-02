import { SET_TOGGLE_MODAL, SET_DELETED_ENTITY_NAME_FOR_MODAL, SET_MODAL_DELETED } from '../../constants/modal';
import { ModalStateTypes, ModalActionTypes } from './modal.reducer.types';

const initialState: ModalStateTypes = {
    open: false,
    name: '',
    delete: false
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
        default:
            return { ...state }
    }
}   