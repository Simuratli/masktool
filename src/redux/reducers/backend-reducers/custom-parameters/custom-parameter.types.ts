export interface CustomParametersStateTypes {
    id?: string,
    name: string,
    attributeTypeCode: number,
    template?: string,
    duplicateToGeneral?: boolean,
    saveChangesDisabled?: boolean,
    notChangableName?: string
}

export interface CustomParametersActionTypes {
    type: string;
    payload: CustomParametersStateTypes
}