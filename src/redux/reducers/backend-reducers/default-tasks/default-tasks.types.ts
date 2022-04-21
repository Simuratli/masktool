export interface DefaultTasksFieldsTypes {
    logicalName: string;
    parameters: string[];
    rule: string;
}

export interface DefaultTasksTypes {
    entityName: string;
    errorRecords: number;
    fields: any;
    filterViewId: string | null;
    maskOperation: boolean;
    previousTaskId: null | string;
    successRecords: number;
    taskId: null | string;
    taskStatus: number;
    totalRecords: number;
}

export interface DefaultTasksStateTypes {
    tasks: DefaultTasksTypes[];
}


export interface DefaultTasksActionTypes {
    type: string;
    payload: DefaultTasksTypes[]
}