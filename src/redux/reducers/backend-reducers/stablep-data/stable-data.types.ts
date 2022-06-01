import { DefaultTasksTypes } from '../default-tasks/default-tasks.types'
import { EntityByViewMainType } from '../entity-by-view/entity-by-view.types'

export interface StableDataReducerStateTypes {
    tasks: DefaultTasksTypes[];
    entities: EntityByViewMainType[],
    searchName: string | undefined;
    mainName: string | undefined;
    name: string | undefined;
    etc: number
}


export interface StableDataReducerActionTypes {
    type: string;
    payload: DefaultTasksTypes[] | EntityByViewMainType[]
}