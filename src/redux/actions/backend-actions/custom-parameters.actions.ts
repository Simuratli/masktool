import { CUSTOM_PAREMETER_CODE_EDITOR, CUSTOM_PAREMETER_RULE_TYPE, CUSTOM_PAREMETER_RULE_NAME, SELECT_SAVED_RULE,COMPARE_FOR_SAVE_CHANGES } from '../../constants/backend-constants/custom-parameters';
import { CustomParametersStateTypes } from '../../reducers/backend-reducers/custom-parameters/custom-parameter.types'

export const setCustomParameterRuleType = (payload: any) => {
    return {
        type: CUSTOM_PAREMETER_RULE_TYPE,
        payload
    }
}


export const setCustomParameterCodeEditor = (payload: string) => {
    return {
        type: CUSTOM_PAREMETER_CODE_EDITOR,
        payload
    }
}


export const setCustomParameterRuleName = (payload: string) => {
    return {
        type: CUSTOM_PAREMETER_RULE_NAME,
        payload
    }
}

export const setSavedRule = (payload: CustomParametersStateTypes) => {
    return {
        type: SELECT_SAVED_RULE,
        payload
    }
}

export const setCompareForSaveChanges = (payload: boolean) => {
    return {
        type: COMPARE_FOR_SAVE_CHANGES,
        payload
    }
}