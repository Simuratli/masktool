import { GET_CUSTOM_RULES } from '../../../constants/backend-constants/custom-rules';
import { CustomRulesStateTypes, CustomRulesActionTypes } from './custom-rules.types';

const initialState: CustomRulesStateTypes = {
    rules: [],
    names: []
}

export const customRulesReducer = (state = initialState, action: CustomRulesActionTypes) => {
    switch (action.type) {
        case GET_CUSTOM_RULES:
            let names: string[] = []
            action.payload.map((rule) => names.push(rule.name))
            return {
                ...state,
                rules: action.payload,
                names: names
            }
        default:
            return { ...state }
    }
}   