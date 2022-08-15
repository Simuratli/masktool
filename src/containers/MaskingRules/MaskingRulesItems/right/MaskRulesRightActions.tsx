/* eslint-disable react/style-prop-object */
import { Button, Input } from '../../../../components'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ReducerType } from '../../../../redux/reducers/reducer.types';
import { setCodeEditorValue, setCustomParameterRuleName, getCustomRules, setCompareForSaveChanges, setCustomParameterCodeEditor } from '../../../../redux/actions';
import { ValidateCustomRule, CreateCustomRule, GetCustomRules, UpdateCustomRule } from '../../../../api'

function MaskRulesRightActions() {
    const dispatch = useDispatch();
    const customParametersState = useSelector((state: ReducerType) => state.customParametersReducer)
    const codeEditorState = useSelector((state: ReducerType) => state.codeEditorReducer.level)
    const customRulesState = useSelector((state: ReducerType) => state.customRulesReducer)
    const [saveText, setsaveText] = useState('')


    const fetchCustomRules = async () => {
        let customRules = await GetCustomRules();
        console.log(customRules,'customrules')
        dispatch(getCustomRules(customRules))
    }

  


    const createCustomRULE = async () => {


        const validation = await ValidateCustomRule({
            attributeTypeCode: customParametersState.attributeTypeCode,
            template: customParametersState.template
        });

        if (validation.data) {
            const createdCustomRule = await CreateCustomRule({
                name: customParametersState.name,
                attributeTypeCode: customParametersState.attributeTypeCode,
                template: customParametersState.template
            });

            if (createdCustomRule.level === "SUCCESS") {
                
                // setsaveText('Parameters were saved.')
            }
            dispatch(setCodeEditorValue(null))
            dispatch(setCustomParameterRuleName(''))
            dispatch(setCompareForSaveChanges(false))
            dispatch(setCustomParameterCodeEditor(''));

            dispatch(setCodeEditorValue(`${customParametersState.name} custom masking rule was saved`))
            fetchCustomRules()

            setTimeout(() => {
                setsaveText('')
                dispatch(setCodeEditorValue(null))
            }, 2000);

        } else {
            dispatch(setCodeEditorValue(validation.level))
        }



    }



    const onChangeCreateName = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCustomParameterRuleName(e.target.value))
        
    }


    let inputSaveasnewButtonDisable = customParametersState.template ? (customParametersState.template.trim() ? false : true) : true
    let saveasnewDisableButton = customParametersState.name ? (customRulesState.names.some((item) => item === customParametersState.name) ? true : false) : true
    let savechangesButtonDisabled = customParametersState.id ? (!saveasnewDisableButton ? true : (codeEditorState?.includes('custom masking rule was saved') ? !customParametersState.saveChangesDisabled : true)) : true
    return (
        <div className="masking__rules__right__actions">
            {/* <Button disabled={!customParametersState.template ? true : (codeEditorState?.includes('SUCCESS') ? true : !customParametersState.saveChangesDisabled)} onClick={validate} type='outlined' size='small' text="Validate" /> */}

            <div className="masking__rules__right__actions__input">
                <Input onChange={onChangeCreateName} value={customParametersState.name} disabled={inputSaveasnewButtonDisable} className="together" type='text' placeholder='Create name' name='name' />
                <Button onClick={createCustomRULE} disabled={saveasnewDisableButton} type="together" size='small' text={customParametersState.id ? "Save as new" : "Save"} />
                {/* <span style={{ color: saveText.includes("is exist") ? "#CE1E1E" : '#80BB5B' }} className="masking__rule__save_button_text">{saveText}</span> */}
            </div>

            {/* {customParametersState.id && <Button onClick={updateCustomRuleFunc} disabled={savechangesButtonDisabled} size='small' text="Save Changes" />} */}

        </div>
    )
}
export default React.memo(MaskRulesRightActions)