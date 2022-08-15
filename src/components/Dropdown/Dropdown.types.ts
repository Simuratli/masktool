import React from 'react';
import { DefaultTasksFieldsTypes } from '../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'

export interface DropdownContentPorpTypes {
    fields: DefaultTasksFieldsTypes[];
    name: string;
    deleteOrMask?: boolean;
    etc: number,
    filter: string[];
    errorText?: string;
    records: boolean;
    logicalName: string | undefined
};


export interface DropdownHeaderToggleIconPropTypes {
    setToggle: () => void;
    name: string,
    requestResult: boolean | null | undefined,
    insideViews:number;
    logicalName:any
};

export interface DropdownSuccessIcon {
    success: boolean | null;
    noDrop?: boolean;
    style?:any
};


export interface DropdownHeaderPorpTypes {
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    name: string;
    actions: string;
    success: boolean | null;
    etc?: number;
    deleteOrMask?: boolean;
    progress: string | undefined,
    requestResult: boolean | null | undefined;
    totalRecords: number,
    successRecords: number;
    errorText?: string | undefined;
    logicalName: string | undefined;
    filter: any
};


export interface DropdownPorpTypes {
    name: string;
    actions: string;
    success: boolean | null;
    fields: DefaultTasksFieldsTypes[];
    etc?: number;
    deleteOrMask?: boolean;
    progress: string | undefined,
    requestResult: boolean | null | undefined;
    filter: string[];
    totalRecords: number;
    successRecords: number;
    errorText?: string | undefined;
    records: boolean;
    logicalName: string | undefined;
    open: boolean
};