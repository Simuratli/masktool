/* eslint-disable react/style-prop-object */
import { Button, Input } from '../../../../components'
import React from 'react'
import { useSelector } from 'react-redux'
import { ReducerType } from '../../../../redux/reducers/reducer.types'

function MaskRulesRightActions() {
    const codeEditorState = useSelector((state: ReducerType) => state.codeEditorReducer.data)

    return (
        <div className="masking__rules__right__actions">
            <Button disabled={!codeEditorState  ? true : false} type='outlined' size='small' text="Validate" />

            <div className="masking__rules__right__actions__input">
                <Input disabled={true} className="together" type='text' placeholder='Create name' name='name' />
                <Button disabled={true} type="together" size='small' text="Save As New" />
            </div>

            <Button disabled={true} size='small' text="Save Changes" />
        </div>
    )
}
export default React.memo(MaskRulesRightActions)