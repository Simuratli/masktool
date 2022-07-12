import React from 'react'
export interface InputPropTypes {
    name: string;
    type: string;
    placeholder: string;
    className?: string;
    disabled?: boolean;
    max?: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    onBlurCapture?: any

}

