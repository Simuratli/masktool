import React, { useState, useEffect } from 'react'
import { Select, MultipleSelect } from '../../../../components'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectMultipleItem, setCustomParameterRuleType, setCodeEditorValue, setSavedRule, setCompareForSaveChanges } from '../../../../redux/actions'
import { ReducerType } from '../../../../redux/reducers/reducer.types'




function MaskingRulesRightSelections() {
    const sellectState = useSelector((state: ReducerType) => state.multipleSelectReducer.data)
    const customRulesState = useSelector((state: ReducerType) => state.customRulesReducer)
    const customParametersState = useSelector((state: ReducerType) => state.customParametersReducer)
    const [template, setTemplate] = useState('')
    const [placeholder, setplaceholder] = useState<string | null>('Chose saved')
    const dispatch = useDispatch()


    let customDataForSelect = customRulesState.categorized.map((category) => {
        return <>
            <div onClick={() => { }} key={category.name} className="select__dropdown__element">
                <span className="select__dropdown__element__text--header">{category.name}</span>

            </div>
            {
                category.data.map((item) => {
                    return <div onClick={() => { }} key={item} className="select__dropdown__element">
                        <span onClick={() => { choseSaved(item) }} className="select__dropdown__element__text">{item}</span>
                        <svg onClick={() => { alert('Do you want to delete it') }} className='select__dropdown__element__icon' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="15" height="15" rx="7.5" fill="#CE1E1E" />
                            <rect x="4" y="5.08008" width="1.52298" height="8.3764" transform="rotate(-45 4 5.08008)" fill="#FEFEFF" />
                            <rect x="5.07715" y="10.9141" width="1.52298" height="8.3764" transform="rotate(-135 5.07715 10.9141)" fill="#FEFEFF" />
                        </svg>
                    </div>
                })
            }
        </>
    })

    console.log(customRulesState, 'customRulesState')

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
    console.log(customRulesState, 'customRulesState')
    console.log(customParametersState, 'customParametersState')

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
                console.log(rule, 'rule')
                dispatch(setSavedRule(rule))
                setTemplate(rule.template)
            }
        })
    }

    useEffect(() => {
        if (customParametersState.template === template) {
            dispatch(setCompareForSaveChanges(false))
            console.log(customParametersState.template, 'same', template)
        } else {
            dispatch(setCompareForSaveChanges(true))
            console.log(customParametersState.template, 'not same', template)
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