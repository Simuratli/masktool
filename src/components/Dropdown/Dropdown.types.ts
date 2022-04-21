import React from 'react';
import { DefaultTasksFieldsTypes } from '../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'

export interface DropdownContentPorpTypes {
    fields: DefaultTasksFieldsTypes[]
};


export interface DropdownHeaderToggleIconPropTypes {
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface DropdownSuccessIcon {
    success: boolean | null;
};


export interface DropdownHeaderPorpTypes {
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    name: string;
    actions: string;
    success: boolean | null;
};


export interface DropdownPorpTypes {
    name: string;
    actions: string;
    success: boolean | null;
    fields: DefaultTasksFieldsTypes[]
};