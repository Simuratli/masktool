export interface PaginationStateTypes {
    current: number,
    range: number,
    pages: (string | number)[]
}


export interface PaginationActionTypes {
    type: string;
    payload: PaginationStateTypes
}