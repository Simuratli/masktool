export interface EntityByViewStateTypes {
    entities: EntityByViewMainType[];
}

export interface EntityByViewMainType {
    name: string;
    data: EntityByViewType[],
    delete?:boolean
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
    delete?:boolean
}

export interface EntityByViewActionsTypes {
    type: string;
    payload: EntityByViewMainType[]
}