export interface EntityByViewStateTypes {
    entities: EntityByViewMainType[];
}

export interface EntityByViewMainType {
    name: string;
    data: EntityByViewType[],
    delete?: boolean
}

export interface EntityByViewCellsType {
    attributeTypeCode: number;
    displayName: string;
    logicalName: string;
    value?: string;
    rule?: string,
    parameters?: any
}

export interface EntityByViewType {
    cells: EntityByViewCellsType[] | never[];
    isDefault: true;
    name: string;
    viewId: string;
    maskOperation?: boolean;
    errorMessage?: boolean | null
}

export interface EntityByViewActionsTypes {
    type: string;
    payload: EntityByViewMainType[]
}