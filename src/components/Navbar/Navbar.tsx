/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../Input';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { setLoader, setDefaultTasks, setAllEntities, getCustomRules, setAllVocabularies, setPaginatedTasks, setStableDefaultTasks, setStableEntityByViews } from '../../redux/actions';
import { GetDefaultTasks, GetEntities, GetCustomRules, GetVocabularesList, GetAttributesByEntity } from '../../api';
import Logo from './logo';
import { defaultTaskAddETC } from '../../utils/DefaultTaskETC';
import { DefaultTasksTypes } from '../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'

function Navbar() {
    const dispatch = useDispatch();
    const stepState = useSelector((state: ReducerType) => state.stepReducer.step);
    const paginatedData = useSelector((state: ReducerType) => state.paginatedTasksdReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks);
    const [search, setSearch] = useState('')
    const [oldPaginatedTasks, setoldPaginatedTasks] = useState<any[]>([])



    useEffect(() => {
        const filteredEntities = defaultTasksState.filter(
            entity => {
                return (
                    entity
                        .entityName
                        .toLowerCase()
                        .includes(search.toLowerCase()));
            }
        );

        dispatch(setPaginatedTasks(filteredEntities))
    }, [search])






    const getEntitiesAndTasks = async () => {
        let entities = await GetEntities();
        dispatch(setAllEntities(entities));
        
        let tasks = await GetDefaultTasks();
        let newTasks = await defaultTaskAddETC(entities, tasks);

        tasks.map(async (task: DefaultTasksTypes) => {
            task.maskOperation ? task.text = `All Records ${task.fields.length} fields are masked` : task.text = "Delete"
            let atributes = await GetAttributesByEntity(task.entityName, task.etc);
            atributes.map((atribute: any) => {
                task.progress = "NULL";
                task.requestResult = null
                task.filter = []


                task.fields.map((field) => {
                    if (atribute.logicalName === field.logicalName) {
                        field.displayName = atribute.displayName
                        field.attributeTypeCode = atribute.attributeTypeCode;
                    }
                })
            })
        })

        dispatch(setDefaultTasks(newTasks));
        
        let customRules = await GetCustomRules();
        dispatch(getCustomRules(customRules))
        let vocabularies = await GetVocabularesList();
        dispatch(setAllVocabularies(vocabularies))
        dispatch(setLoader(false));
    }


    useEffect(() => {
        getEntitiesAndTasks();
        setoldPaginatedTasks(paginatedData.paginated)
    }, [])



    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(prev => e.target.value)

    }




    return (
        <nav className='navbar'>
            <Logo />
            <div className="navbar__search">
                <Input onChange={onSearchChange} value={search} disabled={stepState !== "rules"} name="search" className='search' type="text" placeholder='Search' />
            </div>
        </nav>
    )
}

export default React.memo(Navbar)