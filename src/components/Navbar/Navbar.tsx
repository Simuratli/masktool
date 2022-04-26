/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../Input';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { setLoader, setDefaultTasks, setAllEntities, getCustomRules } from '../../redux/actions';
import { GetDefaultTasks, GetEntities, GetCustomRules } from '../../api';
import Logo from './logo';
import { defaultTaskAddETC } from '../../utils/DefaultTaskETC'

function Navbar() {
    const dispatch = useDispatch();
    const stepState = useSelector((state: ReducerType) => state.stepReducer.step);

    const getEntitiesAndTasks = async () => {
        let entities = await GetEntities();
        dispatch(setAllEntities(entities));
        let tasks = await GetDefaultTasks();
        let newTasks = await defaultTaskAddETC(entities, tasks);
        dispatch(setDefaultTasks(newTasks));
        let customRules = await GetCustomRules();
        dispatch(getCustomRules(customRules))
        dispatch(setLoader(false));
    }


    useEffect(() => {
        getEntitiesAndTasks();
    }, [])


    return (
        <nav className='navbar'>
            <Logo />
            <div className="navbar__search">
                <Input disabled={stepState !== "rules"} name="search" className='search' type="text" placeholder='Search' />
            </div>
        </nav>
    )
}

export default React.memo(Navbar)