import React from 'react';
import { Modal, Dropdown } from '../../components';
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
                <Dropdown name="Entity 1" actions="View - all accounts, masking 8 fields" table={"We have table in here"} />
                <Dropdown name="Entity 2" actions="Nothing selected" table={"We have table in here"} />
                <Dropdown name="Entity 3" actions="View - all accounts, masking 8 fields" table={"We have table in here"} />
                <Dropdown name="Entity 4" actions="Nothing selected" table={"We have table in here"} />
                <RulesFooter />
            </Box>



            {modalState && <Modal>Hellooo</Modal>}
        </div>
    )
}

export default React.memo(Rules)