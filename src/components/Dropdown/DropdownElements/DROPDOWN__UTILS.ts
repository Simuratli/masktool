import { PreparedDeleteEntitesPayloadTypes } from '../../../redux/reducers/backend-reducers/prepare-delete/prepare-delete.types';
import { EntityByViewMainType, EntityByViewStateTypes, EntityByViewType } from '../../../redux/reducers/backend-reducers/entity-by-view/entity-by-view.types';
import { DefaultTasksTypes } from '../../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'

interface actionValueTypes {
    records: boolean
}


export const returnInsideViews = async (deletedArray: PreparedDeleteEntitesPayloadTypes[], entities: EntityByViewMainType[], name: string, step: string) => {
    let data: any[] = []
    for (const deletedItem of deletedArray) {
        if (deletedItem.entityName === name) {
            for (const view of entities) {
                if (view.name === name) {
                    view.data.map((item) => {
                        if (item.viewId === deletedItem.filterViewId) {
                            if (step === "error") {
                                if (item.errorMessage === true) {
                                    data.push(item)
                                }
                            } else {
                                data.push(item)
                            }
                            // data.push(item)
                        }
                    })
                }
            }

        }
    }

    return data
}


export const dropdownArrayUtil = (viewsByEntityState: EntityByViewStateTypes, name: string) => {
    let dropdownDataArray: string[] = []
    viewsByEntityState.entities.map((view: EntityByViewMainType) => {
        if (view.name === name) {
            view.data.map((data: EntityByViewType) => {
                if (!dropdownDataArray.includes(data.name)) {
                    dropdownDataArray.push(data.name)
                }
            })
        }
    })

    return dropdownDataArray
}

