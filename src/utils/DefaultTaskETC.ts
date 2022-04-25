/* eslint-disable array-callback-return */
import { DefaultTasksTypes } from '../redux/reducers/backend-reducers/default-tasks/default-tasks.types';
import { AllEntitiesTypes } from '../redux/reducers/backend-reducers/get-entities/get-entities.types';

export const defaultTaskAddETC = async (entities: AllEntitiesTypes[], tasks: DefaultTasksTypes[]) => {
    entities.map((entity: AllEntitiesTypes) => {
        tasks.map((task: DefaultTasksTypes) => {
            task.delete = true
            if (entity.logicalName === task.entityName) {
                task.etc = entity.etc;
            }
        })
    })
    return tasks
}