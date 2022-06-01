import React from 'react';
import { DefaultTasksFieldsTypes } from '../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'

export interface DropdownContentPorpTypes {
    fields: DefaultTasksFieldsTypes[];
    name: string;
    deleteOrMask?: boolean;
    etc:number,
    filter:string[]
};


export interface DropdownHeaderToggleIconPropTypes {
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    name: string,
    requestResult: boolean | null | undefined
};

export interface DropdownSuccessIcon {
    success: boolean | null;
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
    totalRecords:number,
    successRecords:number
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
    filter:string[];
    totalRecords: number;
    successRecords:number
};