import { GET_CUSTOM_RULES } from '../../../constants/backend-constants/custom-rules';
import { CustomRulesStateTypes, CustomRulesActionTypes } from './custom-rules.types';

const initialState: CustomRulesStateTypes = {
    rules: [],
    names: [],
    categorized: []
}

export const customRulesReducer = (state = initialState, action: CustomRulesActionTypes) => {
    switch (action.type) {
        case GET_CUSTOM_RULES:
            let names: string[] = []
            let line: string[] = []
            let multiline: string[] = []
            let dateType: string[] = []

            action.payload.map((rule) => {
                names.push(rule.name)
                if (rule.attributeTypeCode === 14) {
                    line.push(rule.name)
                }
                if (rule.attributeTypeCode === 7) {
                    multiline.push(rule.name)
                }
                if (rule.attributeTypeCode === 2) {
                    dateType.push(rule.name)
                }
            })
            return {
                ...state,
                rules: action.payload,
                names: names,
                categorized:[
                    {
                        name:"Line",
                        data:line
                    },
                    {
                        name:"Multi line",
                        data:multiline
                    },
                    {
                        name:"Date Type",
                        data:dateType
                    },
                ]
            }
        default:
            return { ...state }
    }
}   