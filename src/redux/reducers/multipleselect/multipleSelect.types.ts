export interface MultipleSelectStateTypes {
    data: string[];
}


export interface MultipleSelectActionTypes {
    type: string;
    payload: {
        checked: boolean;
        data: string;
    }
}


export interface MultipleSelectPayloadTypes {
    checked: boolean;
    data: string;
}
