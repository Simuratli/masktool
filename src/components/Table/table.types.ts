import React from "react";
import { DefaultTasksFieldsTypes } from '../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'

export interface TableRowPropTypes {
    mask: string;
    name:string;
}

export interface TablePropTypes {
    fields: DefaultTasksFieldsTypes[]
}


export interface TableCellPropTypes {
    children: React.ReactNode
}