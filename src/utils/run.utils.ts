
import { DefaultTasksTypes, DefaultTasksFieldsTypes } from '../redux/reducers/backend-reducers/default-tasks/default-tasks.types';
import { PreparedDeleteEntitesPayloadTypes } from '../redux/reducers/backend-reducers/prepare-delete/prepare-delete.types'
import { CreateTask } from '../api';
import { EntityByViewCellsType } from '../redux/reducers/backend-reducers/entity-by-view/entity-by-view.types'


export const prepareFieldsDorDelete = async (array: DefaultTasksFieldsTypes[]) => {
    let newField: any = [];

    array.map((item: DefaultTasksFieldsTypes) => {
        newField.push({
            logicalName: item.logicalName,
            parameters: item.parameters,
            rule: item.rule
        })
    })

    return newField

}


export const changeRequstJson = async (OBJECT: DefaultTasksTypes) => {
    let newObject = {
        entityName: OBJECT.entityName,
        filterViewId: OBJECT.filterViewId,
        maskOperation: OBJECT.maskOperation
    }

    return newObject
}


export const prepareForDelete = (array: DefaultTasksTypes[]) => {
    let newArray: any = [];

    array.map(async (item) => {
        if (item.maskOperation) {
            let newFields = await prepareFieldsDorDelete(item.fields)
            newArray.push({
                entityName: item.entityName,
                fields: newFields,
                filterViewId: item.filterViewId,
                maskOperation: item.maskOperation
            })
        } else {
            newArray.push({
                entityName: item.entityName,
                maskOperation: item.maskOperation
            })
        }
    })

    return newArray
}



export const prepareIndividualForDelete = async (data: DefaultTasksTypes) => {
    let newFields = await prepareFieldsDorDelete(data.fields)
    if (data.maskOperation) {
        return {
            entityName: data.entityName,
            fields: newFields,
            filterViewId: data.filterViewId,
            maskOperation: data.maskOperation
        }
    } else {
        return {
            entityName: data.entityName,
            maskOperation: data.maskOperation
        }
    }
}

let returnedItem: any

export const prepareIndividualEntityForDelete = async (array: PreparedDeleteEntitesPayloadTypes[], name: string) => {


    let loop = true;
    let number = 0
    let data

    while (loop) {
        if (name === array[number].entityName) {
            let requestSecond = await CreateTask(array[number]);
        }
        number++;
        if (array.length === number) break;

    }

    return data
}



export const prepareCells = async (array: EntityByViewCellsType[]) => {
    let newCells: any = []


    array.map((item) => {
        newCells.push({
            attributeTypeCode: item.attributeTypeCode,
            logicalName: item.logicalName,
            parameters: item.parameters,
            rule: item.rule
        })
    })


    return newCells
}



export const updateCellItems = async (newData: any, deleteEntitiesReducer: any) => {


    newData.data.map(async (item: any) => {
        deleteEntitiesReducer.map(async (deleteRed: any) => {
            if (item.name === deleteRed.entityName) {
                item.data.map(async (data: any) => {
                    if (data.viewId === deleteRed.filterViewId) {
                        // deleteRed.cells = data.cells
                        let newCells = await prepareCells(data.cells)
                        deleteRed.fields = newCells
                    }
                })
            }
        })
    })



    return deleteEntitiesReducer
}