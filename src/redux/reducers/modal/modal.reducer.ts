import { SET_TOGGLE_MODAL } from '../../constants/modal'
import { ModalStateTypes, ModalActionTypes } from './modal.reducer.types'

const initialState: ModalStateTypes = {
    open: false,
}

export const modalReducer = (state = initialState, action: ModalActionTypes) => {
    switch (action.type) {
        case SET_TOGGLE_MODAL:
            return {
                ...state,
                open: action.payload
            }
        default:
            return { ...state }
    }
}   