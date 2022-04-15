import React from 'react';
import { Modal } from '../../components';
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


                <RulesFooter />
            </Box>



            {modalState && <Modal>Hellooo</Modal>}
        </div>
    )
}

export default React.memo(Rules)