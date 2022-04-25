import React from 'react';
import { Modal, Dropdown, Header } from '../../components';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../redux/reducers/reducer.types';
import { RulesHeader, RulesFooter } from './RulesElements'
import Box from '../Box'

function Rules() {
    const modalState = useSelector((state: ReducerType) => state.modalReducer.open);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer.tasks);



    return (
        <div className='rules'>

            <Box>
                <RulesHeader />
                {
                    defaultTasksState.length !== 0 && defaultTasksState.map((task) => {
                        return <Dropdown
                            success={null}
                            name={task.entityName}
                            etc={task.etc}
                            fields={task.fields}
                            deleteOrMask={task.delete}
                            actions="View - all accounts, masking 8 fields"
                        />
                    })
                }
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