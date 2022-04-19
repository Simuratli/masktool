import React from 'react';
import { Modal, Dropdown, Table, Header, Button } from '../../components';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { RulesHeader, RulesFooter } from './RulesElements'
import { setToggleModal } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import Box from '../Box'

function Rules() {
    const modalState = useSelector((state: ReducerType) => state.modalReducer.open);
    const dispatch = useDispatch()


    return (
        <div className='rules'>

            <Box>
                <RulesHeader />
                <Dropdown name="Entity 1" actions="View - all accounts, masking 8 fields" table={<Table />} />
                <Dropdown name="Entity 2" actions="Nothing selected" table={<Table />} />
                <Dropdown name="Entity 3" actions="View - all accounts, masking 8 fields" table={<Table />} />
                <Dropdown name="Entity 4" actions="Nothing selected" table={<Table />} />
                <RulesFooter />
            </Box>



            {modalState &&
                <Modal>
                    <Header headerType='modal__header' text='Deleting Confirm' />
                    <p className="modal__text">Are you sure you want to remove Entity1 from the list?</p>
                    <div className="modal__buttons">
                        <Button onClick={() => { dispatch(setToggleModal(false)) }} type='outlined__modal' text='Back' />
                        <Button type='normal__modal' text='Confirm' />
                    </div>
                </Modal>}
        </div>
    )
}

export default React.memo(Rules)