import { CUSTOM_PAREMETER_CODE_EDITOR, CUSTOM_PAREMETER_RULE_TYPE, REFRESH_CUSTOM_PARAMETERS, CUSTOM_PAREMETER_RULE_NAME, SELECT_SAVED_RULE, COMPARE_FOR_SAVE_CHANGES } from '../../../constants/backend-constants/custom-parameters';
import { CustomParametersStateTypes, CustomParametersActionTypes } from './custom-parameter.types';

const initialState: CustomParametersStateTypes = {
    id: "",
    name: "",
    attributeTypeCode: 14,
    template: "",
    duplicateToGeneral: false,
    saveChangesDisabled: true,
    notChangableName: ''
}

export const customParameterReducer = (state = initialState, action: CustomParametersActionTypes) => {
    switch (action.type) {
        case CUSTOM_PAREMETER_RULE_TYPE:
            return {
                ...state,
                id: '',
                name: "",
                duplicateToGeneral: false,
                attributeTypeCode: action.payload,
            }
        case SELECT_SAVED_RULE:
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                attributeTypeCode: action.payload.attributeTypeCode,
                template: action.payload.template,
                duplicateToGeneral: action.payload.duplicateToGeneral,
                notChangableName: action.payload.name
            }
        case REFRESH_CUSTOM_PARAMETERS:
            return {
                ...state,
                id: "",
                name: "",
                template: "",
                saveChangesDisabled: true,
                notChangableName:14
            }
        case CUSTOM_PAREMETER_RULE_NAME:
            return {
                ...state,
                name: action.payload,
            }
        case COMPARE_FOR_SAVE_CHANGES:
            return {
                ...state,
                saveChangesDisabled: action.payload,
            }
        case CUSTOM_PAREMETER_CODE_EDITOR:
            return {
                ...state,
                template: action.payload
            }
        default:
            return { ...state }
    }
}   