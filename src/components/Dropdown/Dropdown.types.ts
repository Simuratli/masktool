import React from 'react';

export interface DropdownContentPorpTypes {
    table: React.ReactNode;
};


export interface DropdownHeaderPorpTypes {
    setToggle:React.Dispatch<React.SetStateAction<boolean>>;
    name:string;
    actions:string;
};


export interface DropdownPorpTypes {
    table:React.ReactNode;
    name:string;
    actions:string;
};