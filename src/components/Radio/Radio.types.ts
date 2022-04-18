import React from 'react';

export interface RadioPropTypes {
    checked: boolean;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    color: string;
    name:string
}

export interface RadioCheckedPropTypes {
    checked: boolean,
    color: string
}