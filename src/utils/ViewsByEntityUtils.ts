import { EntityByViewMainType } from '../redux/reducers/backend-reducers/entity-by-view/entity-by-view.types';
export const addDeleteOrMaskViaHeader = (array: EntityByViewMainType[], name: string, deleteOrMask: boolean | undefined) => {
    if (array.length !== 0) {
        array.map((view) => {
            view.data.map((item => {
                if (view.name === name) {
                    item.maskOperation = deleteOrMask
                }
            }))

        })
        return array
    } else {
        return array
    }
}



export const addDeleteOrMaskIndividual = async (array: EntityByViewMainType[], actionName: string, mainName: string, name: string) => {
    if (actionName === "delete") {
        array.map((view) => {
            if (view.name === mainName) {
                view.data.map((item) => {
                    if (item.name === name) {
                        item.maskOperation = false
                    }
                })
            }
        })
        return array
    } else {
        array.map((view) => {
            if (view.name === mainName) {
                view.data.map((item) => {
                    if (item.name === name) {
                        item.maskOperation = true
                    }
                })
            }
        })

        return array
    }

}