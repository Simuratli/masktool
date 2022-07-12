export interface DefaultTasksFieldsTypes {
    logicalName: string;
    parameters: string[];
    rule: string;
    displayName?: string;
    value?: string;
    attributeTypeCode?: number,
    requiredLevel:number

}

export interface DefaultTasksTypes {
    entityName: string;
    errorRecords: number;
    fields: DefaultTasksFieldsTypes[];
    filterViewId: string | null;
    maskOperation: boolean;
    previousTaskId: null | string;
    successRecords: number;
    taskId: null | string;
    taskStatus: number;
    totalRecords: number;
    etc?: number;
    delete?: boolean;
    progress?: string;
    requestResult?: null | boolean;
    text: string,
    filter: string[],
    errorMessage: boolean | null;
    logicalName?:string;
    displayName?:string;
    errortext?:string;
    records:boolean;
    open:boolean

}

export interface DefaultTasksStateTypes {
    tasks: DefaultTasksTypes[];
}

export interface PaginatedStateTypes {
    paginated: DefaultTasksTypes[]
}




export interface DefaultTasksActionTypes {
    type: string;
    payload: DefaultTasksTypes[]
}