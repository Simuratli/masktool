import { getVersion } from './url.api'
import { requestTypes } from './request.types'

export const makeRequest = async (request: requestTypes, createTask?: boolean) => {
    let url = await getVersion();
    let ReturnObject
    try {
        const response = await fetch(url + "/uds_BusinessDataMaskingService", request);
        let data = await response.json();

        if (createTask) {
            ReturnObject = JSON.parse(data.ResponseObj)
        } else {
            ReturnObject = JSON.parse(data.ResponseObj).data
        }

    } catch (error) {
        ReturnObject = error
    }
    return ReturnObject
}


export const getRequestObjectForSend = async (event: string) => {
    let request: requestTypes = {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "OData-MaxVersion": "4.0",
            "OData-Version": "4.0",
            Accept: "application/json"
        },
        body: event
    }

    return request
}