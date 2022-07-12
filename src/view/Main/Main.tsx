import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navbar, Progress, Footer, Input } from '../../components'
import { Notification, Tutorial, Rules, MaskingRules } from '../../containers'
import { ReducerType } from '../../redux/reducers/reducer.types'
import { setPaginatedTasks } from '../../redux/actions';
import { useDispatch } from 'react-redux'


function Main() {
  const dispatch = useDispatch();
  const stepState = useSelector((state: ReducerType) => state.stepReducer.step)
  const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks);
  const [component, setComponent] = useState<React.ReactNode>(<Notification />)
  const [search, setSearch] = useState('')

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(prev => e.target.value)
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


  useEffect(() => {
    switch (stepState) {
      case "notifications":
        setComponent(<Notification />)
        break;
      case "tutorial":
        setComponent(<Tutorial />)
        break;
      case "rules":
        setComponent(<Rules />)
        break;
      case "progress":
        setComponent(<Rules />)
        break;
      case "settings":
        setComponent(<Tutorial />)
        break;
      case "error":
        setComponent(<Rules />)
        break;
      default:
        break;
    }
  }, [stepState])

  return (
    <div className='main__container'>
      <Navbar />
      <Progress />
      <div className="navbar__search">
        {/* <Input onChange={onSearchChange} value={search} disabled={stepState !== "rules"} name="search" className='search' type="text" placeholder='Search' /> */}
      </div>
      {component}
      <Footer />
    </div>
  )
}

export default React.memo(Main)