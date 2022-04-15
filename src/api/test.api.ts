import { getVersion } from './url.api'

export const getDuplicates = async () => {

    let url = await getVersion()
    let request:any = {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "OData-MaxVersion": "4.0",
            "OData-Version": "4.0",
            Accept: "application/json"
        },
        body: JSON.stringify({ MethodName: "GetEntities" })
    }

    // const response = await fetch(url+'/uds_GetTablesList', request);
    const response = await fetch(url + "/uds_BusinessDataMaskingService", request);
    let data = await response.json();
    let dataValues = JSON.parse(data.ResponseObj)
    return dataValues.data
}
