import { makeRequest, getRequestObjectForSend } from './main-request';
import { CustomParametersStateTypes } from '../redux/reducers/backend-reducers/custom-parameters/custom-parameter.types'

export const GetEntities = async () => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "GetEntities" }))
    let response = await makeRequest(request)
    return response
}


export const GetAttributesByEntity = async (name: string | undefined, etc: number | undefined) => {
    let obj = {
        etc: etc,
        logicalName: name
    }

    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "GetAttributesByEntity", RequestObj: JSON.stringify(obj) }))
    let response = await makeRequest(request)
    return response
}

export const GetViewsByEntity = async (name: string, etc?: number) => {
    let obj = {
        etc: etc,
        logicalName: name
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

export const ValidateCustomRule = async (params: any) => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "ValidateCustomRule", RequestObj: JSON.stringify(params) }))
    let response = await makeRequest(request, true)
    return response
}

export const CreateCustomRule = async (params: any) => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "CreateCustomRule", RequestObj: JSON.stringify(params) }))
    let response = await makeRequest(request, true)
    return response
}

export const DeleteCustomRule = async (params: any) => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "DeleteCustomRule", RequestObj: JSON.stringify(params) }))
    let response = await makeRequest(request, true)
    return response
}


export const UpdateCustomRule = async (params: CustomParametersStateTypes) => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "UpdateCustomRule", RequestObj: JSON.stringify(params) }))
    let response = await makeRequest(request, true)
    return response
}

export const GetDefaultTasks = async () => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "GetDefaultTasks" }))
    let response = await makeRequest(request)
    return response
}


export const GetCustomRules = async () => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "GetCustomRules" }))
    let response = await makeRequest(request)
    return response
}


export const CreateTask = async (obj: any) => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "CreateTask", RequestObj: JSON.stringify(obj) }))
    let response = await makeRequest(request, true)
    return response
}

export const TerminateTask = async () => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "TerminateTask" }))
    let response = await makeRequest(request)
    return response
}

export const GetTasksStatus = async (id?: string) => {
    let request

    if (id) {
        request = await getRequestObjectForSend(JSON.stringify({ MethodName: "GetTasksStatus", RequestObj: JSON.stringify(id) }))
    } else {
        request = await getRequestObjectForSend(JSON.stringify({ MethodName: "GetTasksStatus" }))
    }
    
    let response = await makeRequest(request)
    return response
}


export const ClearTasks = async () => {
    let request = await getRequestObjectForSend(JSON.stringify({ MethodName: "ClearTasks" }))
    let response = await makeRequest(request)
    return response
}



