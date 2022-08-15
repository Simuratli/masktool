export interface ModalStateTypes {
    open:boolean;
    name:string;
    logicalname:string;
    delete:boolean,
    runActionOpen: boolean,
    runActionAllow: boolean,
    addEntity:boolean,
    addFields:boolean,
}

export interface ModalActionTypes {
    type: string;
    payload: boolean;
}

