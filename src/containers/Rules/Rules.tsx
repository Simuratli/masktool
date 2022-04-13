import React from 'react';
import { Button, Modal } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { setToggleModal } from '../../redux/actions';
import { ReducerType } from '../../redux/reducers/reducer.types';

function Rules() {
    const dispatch = useDispatch();
    const modalState = useSelector((state: ReducerType) => state.modalReducer.open);
    console.log(modalState, 'modalState');
    
    return (
        <div className='rules'>
            <div className="rules__button">
                <Button size="big" text="ADD ENTITY" />
            </div>

            <div className="rules__drop">Slava Ukraini!</div>
            <div className="rules__drop">Slava Ukraini!</div>
            <div className="rules__drop">Slava Ukraini!</div>
            <div className="rules__drop">Slava Ukraini!</div>

            <div className="rules__button">
                <Button onClick={() => { dispatch(setToggleModal(true)) }} text="RUN" />
            </div>

            {modalState && <Modal>Hellooo</Modal>}
        </div>
    )
}

export default React.memo(Rules)