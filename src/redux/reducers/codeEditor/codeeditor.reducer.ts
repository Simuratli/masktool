import { SET_CODE_EDITOR_VALUE } from '../../constants/codeEditor'
import { CodeEditorStateTypes, CodeEditorActionTypes } from './codeeditor.types'

const initialState: CodeEditorStateTypes = {
    data: '',
}

export const notificationReducer = (state = initialState, action: CodeEditorActionTypes) => {
    switch (action.type) {
        case SET_CODE_EDITOR_VALUE:
            return {
                ...state,
                data: action.payload
            }
        default:
            return { ...state }
    }
}   