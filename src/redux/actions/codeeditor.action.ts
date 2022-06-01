import { SET_CODE_EDITOR_VALUE } from '../constants/codeEditor'

export const setCodeEditorValue = (payload: string | null) => ({
    type: SET_CODE_EDITOR_VALUE,
    payload
})