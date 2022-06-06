import React, { useState, useEffect } from 'react'
import { Select, MultipleSelect } from '../../../../components'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectMultipleItem, setCustomParameterRuleType, setCodeEditorValue, setSavedRule, setCompareForSaveChanges, getCustomRules } from '../../../../redux/actions'
import { ReducerType } from '../../../../redux/reducers/reducer.types';
import { DeleteCustomRule, GetCustomRules } from '../../../../api'




function MaskingRulesRightSelections() {
    const sellectState = useSelector((state: ReducerType) => state.multipleSelectReducer.data)
    const customRulesState = useSelector((state: ReducerType) => state.customRulesReducer)
    const customParametersState = useSelector((state: ReducerType) => state.customParametersReducer)
    const [template, setTemplate] = useState('')
    const [placeholder, setplaceholder] = useState<string | null>('Chose saved')
    const [deleteLoader, setdeleteLoader] = useState<boolean>(false)
    const dispatch = useDispatch()


    const fetchCustomRules = async () => {
        let customRules = await GetCustomRules();
        dispatch(getCustomRules(customRules))
        console.log(customRules, 'customRules new')
        setdeleteLoader(false)
        setTimeout(() => {
            setdeleteLoader(false)
        }, 500);
    }



    let customDataForSelect: React.ReactNode = !deleteLoader && customRulesState.categorized.map((category) => {
        return <>
            <div onClick={() => { }} key={category.name} className="select__dropdown__element">
                <span className="select__dropdown__element__text--header">{category.name}</span>

            </div>
            {
                category.data.map((item) => {
                    return <div onClick={() => { }} key={item} className="select__dropdown__element">
                        <span onClick={() => { choseSaved(item) }} className="select__dropdown__element__text">{item}</span>
                        <svg onClick={() => { deleteSavedParam(item) }} className='select__dropdown__element__icon' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="15" height="15" rx="7.5" fill="#CE1E1E" />
                            <rect x="4" y="5.08008" width="1.52298" height="8.3764" transform="rotate(-45 4 5.08008)" fill="#FEFEFF" />
                            <rect x="5.07715" y="10.9141" width="1.52298" height="8.3764" transform="rotate(-135 5.07715 10.9141)" fill="#FEFEFF" />
                        </svg>
                    </div>
                })
            }
        </>
    })


    const deleteSavedParam = async (item: any) => {
        for (const rule of customRulesState.rules) {
            if (rule.name === item) {
                let data = await DeleteCustomRule(rule.id)
                console.log(data, 'delete this onr')
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
                name: "DateTime",
                attributeTypeCode: 2
            },
        ]
    }

    const chose = (e: string | null) => {
        dispatch(setCodeEditorValue(null))
        // dispatch(setSelectMultipleItem({ data: e., checked: e.target.checked }))
        FAKE_DATA.rules.map((rule) => {
            if (rule.name === e) {
                dispatch(setCustomParameterRuleType(rule))

            }
        })
    }

    const choseSaved = (e: string | null) => {
        setplaceholder(e)
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
            <Select data={FAKE_DATA.names} onChange={chose} placeholder='Chose rule type' type="big" />
            <Select onChange={choseSaved} customData={customDataForSelect} placeholder={placeholder!} type="big" />
        </div>
    )
}

export default React.memo(MaskingRulesRightSelections)