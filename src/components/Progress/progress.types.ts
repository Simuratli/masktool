import { ReactElement } from "react";

export interface ProgresItemPropTypes {
    icon: ReactElement;
    text: String;
    id: String;
    disabled: String[] | undefined;
}