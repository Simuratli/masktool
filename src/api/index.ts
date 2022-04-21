import { makeRequest, getRequestObjectForSend } from './main-request';

export const GetEntities = async () => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "GetEntities" }))
    let response = await makeRequest(request)
    return response
}


export const GetAttributesByEntity = async () => {
    let obj = {
        description: "Business that represents a customer or potential customer. The company that is billed in business transactions.",
        displayName: "Account",
        etc: 1,
        logicalName: "account"
    }
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "GetAttributesByEntity", RequestObj: JSON.stringify(obj) }))
    let response = await makeRequest(request)
    return response
}

export const GetViewsByEntity = async () => {
    let obj = {
        description: "Business that represents a customer or potential customer. The company that is billed in business transactions.",
        displayName: "Account",
        etc: 1,
        logicalName: "account"
    }
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "GetViewsByEntity", RequestObj: JSON.stringify(obj) }))
    let response = await makeRequest(request)
    return response
}

export const GetVocabularesList = async () => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "GetVocabularesList" }))
    let response = await makeRequest(request)
    return response
}

export const ValidateCustomRule = async () => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "ValidateCustomRule" }))
    let response = await makeRequest(request)
    return response
}

export const CreateCustomRule = async () => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "CreateCustomRule" }))
    let response = await makeRequest(request)
    return response
}

export const UpdateCustomRule = async () => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "UpdateCustomRule" }))
    let response = await makeRequest(request)
    return response
}

export const GetDefaultTasks = async () => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "GetDefaultTasks" }))
    let response = await makeRequest(request)
    return response
}

export const CreateTask = async () => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "CreateTask" }))
    let response = await makeRequest(request)
    return response
}

export const TerminateTask = async () => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "TerminateTask" }))
    let response = await makeRequest(request)
    return response
}

export const GetTasksStatus = async () => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "GetTasksStatus" }))
    let response = await makeRequest(request)
    return response
}


export const ClearTasks = async () => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "ClearTasks" }))
    let response = await makeRequest(request)
    return response
}



