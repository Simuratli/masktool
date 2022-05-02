
export const addValueForCell = (searchName: string | undefined, defaultTasksState: any, rowName: string | undefined, itemName: string, textValue: string, viewsByEntityState: any, mainName: string | undefined) => {
    if (searchName === "entities") {
        defaultTasksState.map((task: any) => {
            if (task.entityName === rowName) {
                task.fields.map((field: any) => {
                    if (field.displayName === itemName) {
                        field.value = textValue;
                    }
                })
            }
        })

        return {
            for: "tasks",
            data: defaultTasksState
        }
    } else {
        viewsByEntityState.map((view: any) => {
            if (mainName === view.name) {
                view.data.map((item: any) => {
                    if (item.name === rowName) {
                        item.cells.map((cell: any) => {
                            if (cell.displayName === itemName) {
                                cell.value = textValue;
                            }
                        })
                    }
                })
            }
        })

        return {
            for: "views",
            data: viewsByEntityState
        }
    }
}


export const ruleFilterUtil = (ruleVariable: number | string) => {
    if (typeof ruleVariable === "number") {
        switch (ruleVariable) {
            case 14:
                return "RandomLetters"
            case 2:
                return "RandomDate"
            case 1:
                return "Lookup"
            case 6:
                return "Customer"
        }

    } else {
        return ruleVariable
    }


}



export const changeMaskingRule = (searchName: string | undefined, defaultTasksState: any, viewsByEntityState: any, rowName: string | undefined, name: string, textValue: string, mainName: string | undefined) => {
    if (searchName === "entities") {
        defaultTasksState.tasks.map((task: any) => {
            if (task.entityName === rowName) {
                task.fields.map((field: any) => {
                    if (field.displayName === name) {
                        field.rule = textValue
                    }
                })
            }
        })

        return {
            for: "entities",
            data: defaultTasksState.tasks
        }

    } else {
        viewsByEntityState.entities.map((view: any) => {
            if (mainName === view.name) {
                view.data.map((item: any) => {
                    if (item.name === rowName) {
                        item.cells.map((cell: any) => {
                            if (cell.displayName === name) {
                                cell.rule = textValue;
                            }
                        })
                    }
                })
            }
        })
        return {
            for: "views",
            data: viewsByEntityState.entities
        }
    }
}