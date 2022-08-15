import { DDMMYYYY } from './dateTimeUtil';

export const addValueForCell = (searchName: string | undefined, defaultTasksState: any, rowName: string | undefined, itemName: string, textValue: string, viewsByEntityState: any, mainName: string | undefined, type: string, value1?: string, value2?: string) => {
    if (searchName === "entities") {
        defaultTasksState.map((task: any) => {
            if (task.entityName === rowName) {

                // task.errorMessage = null
                // task.errorText = ''

                task.fields.map((field: any) => {
                    if (field.displayName === itemName) {

                        if (type === 'date' && value1 && value2) {
                            field.parameters = [DDMMYYYY(value1), DDMMYYYY(value2)];
                        }
                        else if (type === 'randomline') {
                            field.parameters = [value1];
                        } else if (type === 'customrule') {
                            field.parameters = [value1];
                        } else {
                            field.parameters = [textValue];
                        }
                        field.value = textValue
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
                                console.log(mainName, rowName, itemName, 'denerburay')
                                // cell.errorMessage = null
                                // cell.errorText = ''
                                if (type === 'date' && value1 && value2) {
                                    cell.parameters = [DDMMYYYY(value1), DDMMYYYY(value2)];
                                }
                                else if (type === 'randomline') {
                                    cell.parameters = [value1];
                                } else if (type === 'customrule') {
                                    cell.parameters = [value1];
                                } else {
                                    cell.parameters = [textValue];
                                }
                                cell.value = textValue
                            }
                        })
                    }
                })
            }
        })

       


        return {
            for: "views",
            data: viewsByEntityState,
        }
    }
}


export const ruleFilterUtil = (ruleVariable: number | string) => {
    if (typeof ruleVariable === "number") {
        switch (ruleVariable) {
            case 14:
                return "Random letters"
            case 2:
                return "Random date"
            case 1:
                return "Lookup"
            case 6:
                return "Customer"
            case 7:
                return "Random letters"
        }
        return ruleVariable.toString()

    } else {
        if (ruleVariable.includes(" ")) {
            return ruleVariable
        } else {
            if (ruleVariable.includes("Clear")) {
                return "Clear value"
            } else if (ruleVariable.includes("Random")) {

                let newVariable = ruleVariable.split("Random");
                if (newVariable[1].toLowerCase() === 'line') {
                    return "List"
                } else {
                    return "Random " + newVariable[1].toLowerCase()
                }
            } else if (ruleVariable.includes("Custom")) {
                return "Custom rule"
            } else {
                return ruleVariable
            }
        }

    }


}

const convertRuleToBackUtil = (rule: string) => {
    if (rule.includes(" ")) {
        let splitedRule = rule.split(" ");
        let firstElement = splitedRule[1].split("")[0].toUpperCase()
        return splitedRule[0] + firstElement + splitedRule[1].substring(1)
    } else if (rule.includes("List")) {
        return "RandomLine"
    } else {
        return rule
    }
}



export const changeMaskingRule = (searchName: string | undefined, defaultTasksState: any, viewsByEntityState: any, rowName: string | undefined, name: string, textValue: string, mainName: string | undefined) => {
    if (searchName === "entities") {
        defaultTasksState.tasks.map((task: any) => {
            if (task.entityName === rowName) {
                task.fields.map((field: any) => {
                    if (field.displayName === name) {
                        field.rule = convertRuleToBackUtil(textValue)

                        if (convertRuleToBackUtil(textValue) === 'ClearValue') {
                            field.parameters = []
                        }
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
                                cell.rule = convertRuleToBackUtil(textValue);

                                if (convertRuleToBackUtil(textValue) === 'ClearValue') {
                                    cell.parameters = []
                                }

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