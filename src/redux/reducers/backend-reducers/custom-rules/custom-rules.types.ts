
export interface CustomRuleTypes {
    attributeTypeCode: number;
    duplicateToGeneral: boolean;
    id: string;
    name: string;
    template: string
}


export interface CustomRulesStateTypes {
    rules: CustomRuleTypes[];
    names: string[]
}


export interface CustomRulesActionTypes {
    type: string;
    payload: CustomRuleTypes[]
}




