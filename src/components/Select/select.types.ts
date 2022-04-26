import React from "react";

export interface SelectPropTypes {
    data?: string[];
    placeholder?: string;
    type: string;
    customData?: React.ReactNode,
    onChange?: (e: string | null) => void
}