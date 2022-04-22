import React from "react";
import { DefaultTasksFieldsTypes } from '../../redux/reducers/backend-reducers/default-tasks/default-tasks.types';
import { EntityByViewCellsType } from '../../redux/reducers/backend-reducers/entity-by-view/entity-by-view.types'

export interface TableRowPropTypes {
    mask: string;
    name: string;
}

export interface TablePropTypes {
    fields: DefaultTasksFieldsTypes[] | EntityByViewCellsType[]
}


export interface TableCellPropTypes {
    children: React.ReactNode
}