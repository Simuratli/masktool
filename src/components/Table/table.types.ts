import React from "react";
import { DefaultTasksFieldsTypes } from '../../redux/reducers/backend-reducers/default-tasks/default-tasks.types';
import { EntityByViewCellsType } from '../../redux/reducers/backend-reducers/entity-by-view/entity-by-view.types'

export interface TableRowPropTypes {
    mask: string;
    name: string;
    rule: number | string;
    searchName?: string;
    rowName?: string;
    mainName?: string;
    value?: string;
    attributeTypeCode?: number
}

export interface TablePropTypes {
    fields: DefaultTasksFieldsTypes[] | EntityByViewCellsType[];
    name?: string;
    searchName?: string;
    mainName?: string
}


export interface TableCellPropTypes {
    children: React.ReactNode
}


export interface FilteredTableRowPropTypes {
    name: string;
    rule?: number | string;
    rowName?: string;
    searchName?: string;
    itemName: string;
    mainName?: string;
    attributeTypeCode?: number

}