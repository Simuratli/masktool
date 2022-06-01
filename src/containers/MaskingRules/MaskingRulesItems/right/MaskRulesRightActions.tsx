/* eslint-disable react/style-prop-object */
import { Button, Input } from '../../../../components'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ReducerType } from '../../../../redux/reducers/reducer.types';
import { setCodeEditorValue, setCustomParameterRuleName, getCustomRules } from '../../../../redux/actions';
import { ValidateCustomRule, CreateCustomRule, GetCustomRules, UpdateCustomRule } from '../../../../api'

function MaskRulesRightActions() {
    const dispatch = useDispatch();
    const customParametersState = useSelector((state: ReducerType) => state.customParametersReducer)
    const codeEditorState = useSelector((state: ReducerType) => state.codeEditorReducer.level)
    const [saveText, setsaveText] = useState('')


    const fetchCustomRules = async () => {
        let customRules = await GetCustomRules();
        dispatch(getCustomRules(customRules))
    }

    const validate = async () => {
        const validation = await ValidateCustomRule({
            attributeTypeCode: customParametersState.attributeTypeCode,
            template: customParametersState.template
        });
        dispatch(setCodeEditorValue(validation.level))
        console.log(validation, 'validation')
    }

    const createCustomRULE = async () => {
        const createdCustomRule = await CreateCustomRule({
            name: customParametersState.name,
            attributeTypeCode: customParametersState.attributeTypeCode,
            template: customParametersState.template
        });
        if (createdCustomRule.level === "SUCCESS") {
            fetchCustomRules()
            setsaveText('Parameters were saved.')
        }
        console.log(createdCustomRule, 'createdCustomRule')
        setTimeout(() => {
            setsaveText('')
        }, 1000);
        dispatch(setCodeEditorValue(null))
    }


    const updateCustomRule = async () => {
        const updateCustomRule = await UpdateCustomRule({
            name: customParametersState.name,
            id: customParametersState.id,
            attributeTypeCode: customParametersState.attributeTypeCode,
            template: customParametersState.template,
            duplicateToGeneral: customParametersState.duplicateToGeneral
        });
        console.log(updateCustomRule, 'updateCustomRule')
        dispatch(setCodeEditorValue(null))
    }

    let inputSaveasnewButtonDisable = customParametersState.template ? (codeEditorState === "SUCCESS" || !customParametersState.saveChangesDisabled ? false : true) : true

    return (
        <div className="masking__rules__right__actions">
            <Button disabled={!customParametersState.template ? true : (codeEditorState === "SUCCESS" ? true : !customParametersState.saveChangesDisabled)} onClick={validate} type='outlined' size='small' text="Validate" />

            <div className="masking__rules__right__actions__input">
                <Input onChange={(e) => { dispatch(setCustomParameterRuleName(e.target.value)) }} value={customParametersState.name} disabled={inputSaveasnewButtonDisable} className="together" type='text' placeholder='Create name' name='name' />
                <Button onClick={createCustomRULE} disabled={inputSaveasnewButtonDisable} type="together" size='small' text="Save As New" />
                <span className="masking__rule__save_button_text">{saveText}</span>
            </div>

            <Button onClick={updateCustomRule} disabled={customParametersState.id ? (codeEditorState === "SUCCESS" ? !customParametersState.saveChangesDisabled : true) : true} size='small' text="Save Changes" />
        </div>
    )
}
export default React.memo(MaskRulesRightActions)