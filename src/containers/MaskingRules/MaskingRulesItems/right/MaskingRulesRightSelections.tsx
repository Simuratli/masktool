import React from 'react'
import { Select, MultipleSelect } from '../../../../components'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectMultipleItem } from '../../../../redux/actions'
import { ReducerType } from '../../../../redux/reducers/reducer.types'

function MaskingRulesRightSelections() {
    const sellectState = useSelector((state: ReducerType) => state.multipleSelectReducer.data)
    const dispatch = useDispatch()
    let FAKE_DATA = ["Data rule", "Text rule", "Money Rule", "Multiline rules"]

    const chose = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSelectMultipleItem({ data: e.target.value, checked: e.target.checked }))
    }
    const deleteFunc = (item: string) => {
        dispatch(setSelectMultipleItem({ data: item, checked: false }))
    }

    return (
        <div className="masking__rules__right__selectitems">
            <MultipleSelect data={FAKE_DATA} deleteFunc={deleteFunc} values={sellectState} chose={chose} />
            <Select />
        </div>
    )
}

export default React.memo(MaskingRulesRightSelections)