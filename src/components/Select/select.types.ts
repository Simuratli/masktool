import React from "react";

export interface SelectPropTypes {
    data?: (string | number)[];
    placeholder?: string;
    type: string;
    customData?: React.ReactNode,
    onChange?: (e: string | null) => void,
    deletableData?:any[];
    deleteLoader?:any;
    choseSaved?:any, 
    deleteSavedParam?:any;
    selectedValueForRule?:string;
    disabled?:boolean;
    pagination?:number;
    list?:boolean
}