import React, { useState, useEffect } from 'react'
import { Button, Pagination, Input } from '../../../components';
import { setModalAddEntity, setModalToggleActions, setProgressAdd, setPaginatedTasks } from "../../../redux/actions";
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from '../../../redux/reducers/reducer.types'

function RulesHeader() {
    const dispatch = useDispatch();
    const stepState = useSelector((state: ReducerType) => state.stepReducer);
    const erroredState = useSelector((state: ReducerType) => state.erroredTaskReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks);
    const [search, setSearch] = useState('')


    const RunFunction = async () => {
        dispatch(setModalToggleActions(true))
        dispatch(setProgressAdd(0))
        if (stepState.step === "error") {
            dispatch(setPaginatedTasks(erroredState.tasks))
        }
    }

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch((prev: string) => e.target.value)
    }


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

    return (
        <div className="rules__header">
            {
                stepState.step !== 'progress' && <>
                    <div className="rules__pagination">
                        <Pagination />
                    </div>
                    <div className="navbar__search">
                        <Input onChange={onSearchChange} value={search} disabled={stepState.step !== "rules"} name="search" className='search' type="text" placeholder='Search entity' />

                        <Button onClick={() => { dispatch(setModalAddEntity(true)) }} type='normal__modal entity_add' size="big" text="Add entity" />
                        <Button size='run' type={'gold'} onClick={RunFunction} text="RUN" />
                    </div>

                </>
            }

        </div>
    )
}

export default React.memo(RulesHeader)