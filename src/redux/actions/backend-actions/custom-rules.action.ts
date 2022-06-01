import { GET_CUSTOM_RULES } from '../../constants/backend-constants/custom-rules';
import { CustomRuleTypes } from '../../reducers/backend-reducers/custom-rules/custom-rules.types';

export const getCustomRules = (payload: CustomRuleTypes[]) => ({
    type: GET_CUSTOM_RULES,
    payload
})


