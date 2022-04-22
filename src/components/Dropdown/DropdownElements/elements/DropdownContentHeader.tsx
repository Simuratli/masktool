import React, { useCallback, useState } from 'react'
import { Box } from '../../../../containers'
import RadioButton from '../../../Radio'
import { choseActionForRecords } from '../../../../utils/DropdownChoseAction'
import MultipleSelect from '../../../MultipleSelect'
import { DropdownHeaderPropsTypes } from '../DropdownContent.types'


function DropdownContentHeader({ checked, setChecked, filter, setfilter }: DropdownHeaderPropsTypes) {

    let FAKE_DATA = ["All accounts", "Active accounts", "Inactive accounts"]


    const handleSelectFilter = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            let actionValue = choseActionForRecords(e.target.name)
            setChecked(actionValue)
        },
        [],
    )

    const chose = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.checked) {
                setfilter((prev) => ([...prev, e.target.value]))
                setChecked(choseActionForRecords('special'))
            } else {
                setfilter(filter.filter((word: string) => word !== e.target.value))
            }
        },
        [filter],
    )

    const deleteFunc = useCallback(
        (item: string) => {
            setfilter(filter.filter((word: string) => word !== item))
        },
        [filter],
    )


    return (
        <div className="dropdown__content__head">
            <Box type='small'>
                <div className="dropdown__box__container">
                    <div className="dropdown__box__container__main">
                        <RadioButton name="all" color="blue" checked={checked.records} onChange={handleSelectFilter} label={"All records"} />
                        <div className="dropdown__box__container__main__filter">
                            <RadioButton name="special" color="blue" checked={!checked.records} onChange={handleSelectFilter} />
                            <MultipleSelect placeholder='Select view to edit' data={FAKE_DATA} deleteFunc={deleteFunc} values={filter} chose={chose} />
                        </div>
                    </div>
                    {
                        filter.length >= 0 ? <div className="dropdown__box__container__actions">
                            <RadioButton name="delete" color="green" checked={checked.delete} onChange={handleSelectFilter} label={"Delete"} />
                            <RadioButton name="masking" color="green" checked={!checked.delete} onChange={handleSelectFilter} label={"Maksing"} />
                        </div> :
                            <div className="dropdown__box__container__actions"></div>
                    }
                </div>
            </Box>
        </div>
    )
}

export default React.memo(DropdownContentHeader)