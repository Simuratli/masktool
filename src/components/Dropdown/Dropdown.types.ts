import React from 'react';

export interface DropdownContentPorpTypes {
    table: React.ReactNode;
};


export interface DropdownHeaderToggleIconPropTypes {
    setToggle:React.Dispatch<React.SetStateAction<boolean>>;
};

export interface DropdownSuccessIcon {
    success:boolean | null;
};


export interface DropdownHeaderPorpTypes {
    setToggle:React.Dispatch<React.SetStateAction<boolean>>;
    name:string;
    actions:string;
    success:boolean | null;
};


export interface DropdownPorpTypes {
    table:React.ReactNode;
    name:string;
    actions:string;
    success:boolean | null;
};