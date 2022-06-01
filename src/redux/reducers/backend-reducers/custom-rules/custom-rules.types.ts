
export interface CustomRuleTypes {
    attributeTypeCode: number;
    duplicateToGeneral: boolean;
    id: string;
    name: string;
    template: string
}

interface CategorizedDataInterface {
    name:string,
    data:string[]
}

export interface CustomRulesStateTypes {
    rules: CustomRuleTypes[];
    names: string[],
    categorized:CategorizedDataInterface[]
}


export interface CustomRulesActionTypes {
    type: string;
    payload: CustomRuleTypes[]
}




