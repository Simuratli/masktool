export interface AllEntitiesTypes {
    description: string;
    displayName: string;
    etc: number;
    logicalName: string;
    entityName?:string;
}

export interface GetEntitiesReducerStateTypes {
    entities: AllEntitiesTypes[]
}

export interface GetEntitiesReducerActionTypes {
    type: string;
    payload: AllEntitiesTypes[]
}