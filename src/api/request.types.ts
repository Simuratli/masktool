export interface requestTypes {
    method: string;
    cache: "no-cache",
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "OData-MaxVersion": "4.0",
        "OData-Version": "4.0",
        Accept: "application/json"
    };
    body: string;
}