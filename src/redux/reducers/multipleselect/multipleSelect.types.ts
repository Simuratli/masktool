export interface MultipleSelectStateTypes {
    data: string[]
}


export interface MultipleSelectActionTypes {
    type: String;
    payload: {
        checked: Boolean,
        data: string
    }
}


export interface MultipleSelectPayloadTypes {
    checked: Boolean,
    data: string
}
