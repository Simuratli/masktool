import React from "react";

export interface SelectHeaderTypes {
    children?: React.ReactNode;
    onClick?: (e?:any) => void;
    iconProp: Boolean;
    IconClick?: (e?:any) => void;
}