import { StableDataReducerStateTypes } from '../../redux/reducers/backend-reducers/stablep-data/stable-data.types';
import { DefaultTasksStateTypes } from '../../redux/reducers/backend-reducers/default-tasks/default-tasks.types';
import { EntityByViewStateTypes } from '../../redux/reducers/backend-reducers/entity-by-view/entity-by-view.types';

export const tableAddFieldUtil = (stableDataReducer: StableDataReducerStateTypes, defaultTasksState: DefaultTasksStateTypes, selectedFields: any[], viewsByEntityState: EntityByViewStateTypes) => {
    if (stableDataReducer.searchName === "entities") {

        defaultTasksState.tasks.map((item) => {
            if (item.entityName === stableDataReducer.name || item.entityName === stableDataReducer.logicalName) {

                const res1 = selectedFields.filter((page1) => !item.fields.find(page2 => page1.logicalName === page2.logicalName))
                item.fields = [...item.fields, ...res1]
                item.text =  `You are going to mask ${item.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields in all records.`
            }

        })
        return defaultTasksState.tasks
    } else {
        viewsByEntityState.entities.map((view) => {
            if (view.name === stableDataReducer.mainName || view.name === stableDataReducer.logicalName) {

                view.data.map((item) => {
                    if (item.name === stableDataReducer.name) {
                        const res1 = selectedFields.filter((page1) => !item.cells.find(page2 => page1.logicalName === page2.logicalName))
                        item.cells = [...item.cells, ...res1]
                    }
                })

            }
        })
        return viewsByEntityState.entities
    }
}


export const helpChoseToRandomLine = (name: string, vocabularies: any) => {
    let data: string = ''
    console.log(name, 'hoosoadas')
    if (name) {
        if (name.includes('City')) {
            data = 'Cities'
        } else if (name.includes('Country/Region')) {
            data = "Countries"
        } else if (name.includes('First Name')) {
            data = "Names"
        } else if (name.includes('Last Name')) {
            data = "Last names"
        } else if (name.includes('company')) {
            data = "Companies"
        } else if (name.includes('Email')) {
            data = "Email domains"
        } else {
            vocabularies.map((item:any)=>{
                if(item.displayName === name){
                    data =  item.logicalName
                }
            })
        }
    } else {
        data = "Names"
    }


    if(data === ""){
        data = "Names"
    }

    console.log(data,'alooooooooooooooooooooooooooooooooo')
   
    return data
}


export const helpChoseToRandomLineReverse = (name: string, vocabularies: any) => {
    let data: string = ''
    
    if (name) {
        if (name.includes('Cities')) {
            data = 'Cities'
        } else if (name.includes('Countries')) {
            data = "Countries"
        } else if (name.includes('UserFirstName')) {
            data = "Names"
        } else if (name.includes('UserLastNames')) {
            data = "Last names"
        } else if (name.includes('CompanyNames')) {
            data = "Companies"
        } else if (name.includes('Domens')) {
            data = "Email domains"
        } else {
            vocabularies.map((item:any)=>{
                if(item.logicalName === name){
                    data =  item.displayName
                }
            })
        }
    } else {
        data = "Names"
    }


    if(data === ""){
        data = "Names"
    }
    
    return data
}