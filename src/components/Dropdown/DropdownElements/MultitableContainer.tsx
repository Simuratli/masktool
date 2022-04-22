import React, { useState } from 'react';
import { Box } from '../../../containers';
import { RadioButton, Table } from '../..';
import { MultitableContainerPropTypes } from './DropdownContent.types'

function MultitableContainer({ name, fields }: MultitableContainerPropTypes) {
    const [deleteAction, setDeleteAction] = useState<boolean>(false)

    const handleSelectFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "delete") {
            setDeleteAction(true)
        } else {
            setDeleteAction(false)
        }
    }

    return (
        <div className='multitable_container'>
            <Box type='small'>
                <div className="dropdown__box__container">
                    <div className="dropdown__box__container__main">
                        <span className="dropdown__box__container__main__text">{name}</span>
                    </div>
                    <div className="dropdown__box__container__actions">
                        <RadioButton name="delete" color="green" checked={deleteAction} onChange={handleSelectFilter} label={"Delete"} />
                        <RadioButton name="masking" color="green" checked={!deleteAction} onChange={handleSelectFilter} label={"Maksing"} />
                    </div>
                </div>
            </Box>
            <Table fields={fields} />
        </div>
    )
}

export default React.memo(MultitableContainer)