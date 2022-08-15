import React, { useState, useEffect } from 'react'
import { Button, Pagination, Input } from '../../../components';
import { setModalAddEntity, setModalToggleActions, setProgressAdd, setPaginatedTasks, setSearch } from "../../../redux/actions";
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from '../../../redux/reducers/reducer.types'

function RulesHeader() {
    const dispatch = useDispatch();
    const stepState = useSelector((state: ReducerType) => state.stepReducer);
    const erroredState = useSelector((state: ReducerType) => state.erroredTaskReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks);
    const paginatedTasksdState = useSelector((state: ReducerType) => state.paginatedTasksdReducer.paginated)
    const searchState = useSelector((state: ReducerType) => state.searchReducer.search)
    const modalState = useSelector((state: ReducerType) => state.modalReducer);
    const [search, setSearchva] = useState('')


    const RunFunction = async () => {
        dispatch(setModalToggleActions(true))
        dispatch(setProgressAdd(0))

    }

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchva((prev: string) => e.target.value)
        dispatch(setSearch(e.target.value))
    }




    const [erooroedTask, seterooroedTask] = useState(erroredState.tasks)

    useEffect(() => {
        if (stepState.step === 'error') {
            seterooroedTask(erroredState.tasks)
        }
    }, [stepState.step, paginatedTasksdState])

    useEffect(() => {

        let filteredEntities = defaultTasksState.filter(
            entity => {
                return (
                    entity
                        .entityName
                        .toLowerCase()
                        .includes(searchState.toLowerCase()));
            }
        );

        dispatch(setPaginatedTasks(filteredEntities))

    }, [searchState])



    useEffect(() => {

        if (modalState.addEntity || modalState.open || modalState.runActionOpen || modalState.addFields) {
            console.log("searchModalShouldWork")
            dispatch(setSearch(''))
            // window.scrollTo(0, 0)
        }
    }, [modalState.addEntity, modalState.open, modalState.runActionOpen, modalState.addFields])



    return (
        <div className="rules__header">
            <div className="rules__pagination">
                {
                    stepState.step !== 'progress' && (defaultTasksState.filter((v, i, a) => a.findIndex(v2 => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i).length <= 5 ? <></> : <Pagination />)
                }

            </div>
            <div className="navbar__search">
                <Input onChange={onSearchChange} value={searchState} disabled={stepState.step === "progress"} name="search" className='search' type="text" placeholder='Search entity' />

                {
                    stepState.step !== 'progress' && <>
                        <Button onClick={() => { dispatch(setModalAddEntity(true)) }} type='normal__modal entity_add' size="big" text="Add entity" />
                        {
                            (defaultTasksState.filter((v, i, a) => a.findIndex(v2 => (v2.entityName.toLowerCase() === v.entityName.toLowerCase())) === i).length <= 5 ? <></> : <Button size='run' type={'gold'} onClick={RunFunction} text="RUN" />)
                        }
                    </>
                }
            </div>

        </div>
    )
}

export default React.memo(RulesHeader)