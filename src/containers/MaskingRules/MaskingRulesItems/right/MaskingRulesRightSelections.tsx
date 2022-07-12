import React, { useState, useEffect } from 'react'
import { Select, MultipleSelect } from '../../../../components'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectMultipleItem, setCustomParameterRuleType, setCodeEditorValue, setSavedRule, setCompareForSaveChanges, getCustomRules, refreshCustomParameters, setCustomParameterRuleName, setCustomParameterCodeEditor } from '../../../../redux/actions'
import { ReducerType } from '../../../../redux/reducers/reducer.types';
import { DeleteCustomRule, GetCustomRules } from '../../../../api'
import { DropdownDataForSaved } from './MASKING_RULE_UTIL';



function MaskingRulesRightSelections() {
    const sellectState = useSelector((state: ReducerType) => state.multipleSelectReducer.data)
    const customRulesState = useSelector((state: ReducerType) => state.customRulesReducer)
    const customParametersState = useSelector((state: ReducerType) => state.customParametersReducer)
    const [template, setTemplate] = useState('')
    const [placeholder, setplaceholder] = useState<string | null>('Choose saved')
    const [deleteLoader, setdeleteLoader] = useState<boolean>(false)
    const dispatch = useDispatch()
    const [selectedTab, setselectedTab] = useState<'text' | 'data' | 'multiline'>("text")

    const [categorizedSavedData, setcategorizedSavedData] = useState(customRulesState.categorized)
    const [selectedValueForRule, setselectedValueForRule] = useState('')
    const fetchCustomRules = async () => {
        let customRules = await GetCustomRules();
        dispatch(getCustomRules(customRules))
        setdeleteLoader(false)
        setTimeout(() => {
            setdeleteLoader(false)
        }, 500);
    }



    const deleteSavedParam = async (item: any) => {
        for (const rule of customRulesState.rules) {
            if (rule.name === item) {
                let data = await DeleteCustomRule(rule.id)
            }
        }
        setdeleteLoader(true)
        fetchCustomRules()
    }


    let FAKE_DATA = {
        names: ['Line', 'Multi line', "Date type"],
        rules: [
            {
                name: "Line",
                attributeTypeCode: 14
            },
            {
                name: "Multi line",
                attributeTypeCode: 7
            },
            {
                name: "Date type",
                attributeTypeCode: 2
            },
        ]
    }

    const chose = (e: string | null) => {
        dispatch(setCodeEditorValue(null))
        setplaceholder("Choose saved")
        FAKE_DATA.rules.map(async (rule) => {
            if (rule.name === e) {
                dispatch(setCustomParameterRuleType(rule))
                let newListForSaved = await DropdownDataForSaved(customRulesState.categorized, rule.attributeTypeCode)
                setcategorizedSavedData(newListForSaved)
            }
        })
    }


    useEffect(() => {
        DropdownDataForSaved(customRulesState.categorized, customParametersState.attributeTypeCode).then((newListForSaved) => {
            setcategorizedSavedData(newListForSaved)
        })
    }, [customParametersState.attributeTypeCode, customRulesState.categorized])


    const choseSaved = (e: string | null, name: string) => {
        setplaceholder(e)
        setselectedValueForRule(name)
        dispatch(setCodeEditorValue(null))
        customRulesState.rules.map((rule) => {
            if (rule.name === e) {
                dispatch(setSavedRule(rule))
                setTemplate(rule.template)
            }
        })
    }

    useEffect(() => {
        if (customParametersState.template === template) {
            dispatch(setCompareForSaveChanges(false))
        } else {
            dispatch(setCompareForSaveChanges(true))
        }
    }, [customParametersState.template, template])



    return (
        <div className="masking__rules__right__selectitems">
            {/* <MultipleSelect placeholder='Chose rule type' data={customRulesState.names} deleteFunc={deleteFunc} values={sellectState} chose={chose} /> */}
            {/* <Select selectedValueForRule={selectedValueForRule} data={FAKE_DATA.names} onChange={chose} placeholder='Choose rule type' type="big" /> */}
            {/* <Select deletableData={categorizedSavedData} choseSaved={choseSaved} deleteLoader={deleteLoader} deleteSavedParam={deleteSavedParam} placeholder={placeholder!} type="big" /> */}
            <div className="tabs_header small">
                <div onClick={() => { setselectedTab('text'); dispatch(setCustomParameterRuleType(14)); dispatch(refreshCustomParameters()); dispatch(setCustomParameterRuleName('')); dispatch(setCustomParameterCodeEditor('')); }} className={`tab_item tab_item_first ${selectedTab === 'text' && customParametersState.attributeTypeCode === 14 && "active"}`}>Text fields</div>
                <div onClick={() => { setselectedTab('data'); dispatch(setCustomParameterRuleType(2)); dispatch(refreshCustomParameters()); dispatch(setCustomParameterRuleName('')); dispatch(setCustomParameterCodeEditor('')); }} className={`tab_item ${selectedTab === 'data' && customParametersState.attributeTypeCode === 2 && "active"}`}>Date fields</div>
                <div onClick={() => { setselectedTab('multiline'); dispatch(setCustomParameterRuleType(7)); dispatch(refreshCustomParameters()); dispatch(setCustomParameterRuleName('')); dispatch(setCustomParameterCodeEditor('')); }} className={`tab_item ${selectedTab === 'multiline' && customParametersState.attributeTypeCode === 7 && "active"}`}>Multiline fields</div>
            </div>
        </div>
    )
}

export default React.memo(MaskingRulesRightSelections)