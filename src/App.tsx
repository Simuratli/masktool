import { MainView } from './view';
import { Loader } from './components';
import { useSelector } from 'react-redux';
import { ReducerType } from './redux/reducers/reducer.types';
import { useEffect } from 'react'

function App() {
  const loading = useSelector((state: ReducerType) => state.loaderReducer.loading)
  const modalState = useSelector((state: ReducerType) => state.modalReducer);



  useEffect(() => {
    if (modalState.open || modalState.runActionOpen || modalState.addEntity || modalState.addFields) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [modalState.open, modalState.runActionOpen, modalState.addEntity, modalState.addFields])



  return (
    <div className="App">
      {loading && <Loader />}
      <MainView />
    </div>
  );
}

export default App;
