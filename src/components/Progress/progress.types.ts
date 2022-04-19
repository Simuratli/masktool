import { ReactElement } from "react";

export interface ProgresItemPropTypes {
    icon: ReactElement;
    text: String;
    id: String;
    disabled: boolean;
}


export interface ProgresStateTypes {
    id: string;
    text: string;
    disabled: boolean;
    icon: string;
}


export interface ProgresSettingsPropTypes {
    stepState:string;
}