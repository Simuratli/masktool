import React, { useCallback } from 'react'
import { Box } from '../../../containers'
import RadioButton from '../../Radio'
import { choseActionForRecords } from '../../../utils/DropdownChoseAction'
import { DropdownContentPorpTypes } from '../Dropdown.types'

function DropdownContent({ table }: DropdownContentPorpTypes) {

    const [checked, setChecked] = React.useState({
        records: true,
        delete: false
    })



    const handleSelectFilter = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            let actionValue = choseActionForRecords(e.target.name)
            setChecked(actionValue)
        },
        [],
    )




    return (
        <div className="dropdown__content">
            <div className="dropdown__content__head">
                <Box type='small'>
                    <div className="dropdown__box__container">
                        <div className="dropdown__box__container__main">
                            <RadioButton name="all" color="blue" checked={checked.records} onChange={handleSelectFilter} label={"All records"} />
                            <RadioButton name="special" color="blue" checked={!checked.records} onChange={handleSelectFilter} />
                        </div>
                        <div className="dropdown__box__container__actions">
                            <RadioButton name="delete" color="green" checked={checked.delete} onChange={handleSelectFilter} label={"Delete"} />
                            <RadioButton name="masking" color="green" checked={!checked.delete} onChange={handleSelectFilter} label={"Maksing"} />
                        </div>
                    </div>
                </Box>
            </div>

            <div className="dropdown__content__table">
                {table}
            </div>
        </div>
    )
}

export default React.memo(DropdownContent)