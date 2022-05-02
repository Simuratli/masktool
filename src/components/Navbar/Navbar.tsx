/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../Input';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { setLoader, setDefaultTasks, setAllEntities, getCustomRules, setAllVocabularies } from '../../redux/actions';
import { GetDefaultTasks, GetEntities, GetCustomRules, GetVocabularesList, GetAttributesByEntity } from '../../api';
import Logo from './logo';
import { defaultTaskAddETC } from '../../utils/DefaultTaskETC';
import { DefaultTasksTypes } from '../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'

function Navbar() {
    const dispatch = useDispatch();
    const stepState = useSelector((state: ReducerType) => state.stepReducer.step);

    const getEntitiesAndTasks = async () => {
        let entities = await GetEntities();
        dispatch(setAllEntities(entities));
        let tasks = await GetDefaultTasks();
        let newTasks = await defaultTaskAddETC(entities, tasks);
        tasks.map(async (task: DefaultTasksTypes) => {
            let atributes = await GetAttributesByEntity(task.entityName, task.etc);
            atributes.map((atribute: any) => {
                task.fields.map((field) => {
                    if (atribute.logicalName === field.logicalName) {
                        field.displayName = atribute.displayName
                        field.attributeTypeCode = atribute.attributeTypeCode
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
    }, [])


    return (
        <nav className='navbar'>
            <Logo />
            <div className="navbar__search">
                <Input onChange={(e) => { console.log(e) }} value="" disabled={stepState !== "rules"} name="search" className='search' type="text" placeholder='Search' />
            </div>
        </nav>
    )
}

export default React.memo(Navbar)