export interface CustomParametersStateTypes {
    id?: string,
    name: string,
    attributeTypeCode: number,
    template?: string,
    duplicateToGeneral?: boolean,
    saveChangesDisabled?:boolean
}

export interface CustomParametersActionTypes {
    type: string;
    payload: CustomParametersStateTypes
}