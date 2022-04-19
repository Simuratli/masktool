import React from 'react';
import { Modal, Dropdown, Table, Header } from '../../components';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { RulesHeader, RulesFooter } from './RulesElements'
import Box from '../Box'

function Rules() {
    const modalState = useSelector((state: ReducerType) => state.modalReducer.open);


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
                </Modal>}
        </div>
    )
}

export default React.memo(Rules)