import React from 'react';
import Button from '../../Button';
import { useDispatch } from 'react-redux';
import { setToggleModal } from '../../../redux/actions';

function ModalFooterButtons() {
    const dispatch = useDispatch()
    return (
        <div className="modal__buttons">
            <Button onClick={() => { dispatch(setToggleModal(false)) }} type='outlined__modal' text='Back' />
            <Button type='normal__modal' text='Confirm' />
        </div>
    )
}

export default React.memo(ModalFooterButtons)