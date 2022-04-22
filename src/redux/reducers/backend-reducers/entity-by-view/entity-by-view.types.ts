export interface EntityByViewStateTypes {
    entities: EntityByViewMainType[];
}

export interface EntityByViewMainType {
    name: string;
    data: EntityByViewType[]
}

export interface EntityByViewCellsType {
    attributeTypeCode: number;
    displayName: string;
    logicalName: string;
}

export interface EntityByViewType {
    cells: EntityByViewCellsType[] | never[];
    isDefault: true;
    name: string;
    viewId: string;
}

export interface EntityByViewActionsTypes {
    type: string;
    payload: EntityByViewMainType[]
}