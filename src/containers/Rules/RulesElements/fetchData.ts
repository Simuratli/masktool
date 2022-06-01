import { GetEntities, GetDefaultTasks, GetAttributesByEntity } from '../../../api';
import { defaultTaskAddETC } from '../../../utils/DefaultTaskETC';
import { DefaultTasksTypes } from '../../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'

export const fetchDefaultTaskForModal = async () => {
    let entities = await GetEntities();

    let tasks = await GetDefaultTasks();
    let newTasks = await defaultTaskAddETC(entities, tasks);

    for (const task of tasks) {
        task.maskOperation ? task.text = `All Records ${task.fields.length} fields are masked` : task.text = "Delete"
        let atributes = await GetAttributesByEntity(task.entityName, task.etc);
        for (const atribute of atributes) {
            task.progress = "NULL";
            task.requestResult = null
            for (const field of task.fields) {
                if (atribute.logicalName === field.logicalName) {
                    field.displayName = atribute.displayName
                    field.attributeTypeCode = atribute.attributeTypeCode;
                }
            }
        }
    }


    return newTasks
}
