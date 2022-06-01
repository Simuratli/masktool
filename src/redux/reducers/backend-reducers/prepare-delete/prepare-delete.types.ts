export interface PreparedDeleteEntitesStateTypes {
    delete: PreparedDeleteEntitesPayloadTypes[];
}


export interface PreparedDeleteEntitesPayloadTypes {
    entityName: string;
    maskOperation: boolean;
    filterViewId: string;
    cells?: any,
    fields?:any,
}