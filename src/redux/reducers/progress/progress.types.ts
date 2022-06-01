export interface ProgressStateTypes {
    number:number;
}

export interface ProgressActionTypes {
    type:string;
    payload:ProgressStateTypes;
}