import { MainView } from './view';
import { Loader } from './components';
import { useSelector } from 'react-redux';
import React from 'react';
import { ReducerType } from './redux/reducers/reducer.types'

function App() {

  const loading = useSelector((state: ReducerType) => state.loaderReducer.loading)

  return (
    <div className="App">
      {loading && <Loader />}
      <MainView />
    </div>
  );
}

export default React.memo(App);
