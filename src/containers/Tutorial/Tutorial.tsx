import React, { useState, useEffect } from 'react'
import { Header, Button } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { ReducerType } from '../../redux/reducers/reducer.types'
import { tutorialText } from './tutorial.data'
import { setStep } from '../../redux/actions'
import { HowToUse, HowToCustomize, MaskingWithCustomList } from './elements';
import { MaskingRules } from '../../containers'


function Tutorial() {
    const stepState = useSelector((state: ReducerType) => state.stepReducer);
    const [selectedTab, setselectedTab] = useState<'tutorial' | 'customize' | 'masking' | 'list'>("tutorial")
    const dispatch = useDispatch()

    useEffect(() => {
        if (stepState.step === "settings") setselectedTab("masking")
    }, [stepState])



    const ReturnTutorialElement = () => {
        switch (selectedTab) {
            case 'tutorial':
                return <HowToUse />;
            case 'customize':
                return <HowToCustomize />;
            case 'masking':
                return <MaskingRules />;
            case 'list':
                return <MaskingWithCustomList />;
            default:
                return <HowToUse />;
        }
    }

    return (
        <section>


            <div className="tutorial">
                <Header
                    text="User guide"
                    headerType="big"
                />

                <div className="tabs_header">
                    <div onClick={() => { setselectedTab('tutorial') }} className={`tab_item tab_item_first ${selectedTab === 'tutorial' && "active"}`}>How to use</div>
                    <div onClick={() => { setselectedTab('customize') }} className={`tab_item ${selectedTab === 'customize' && "active"}`}>How to customize</div>
                    <div onClick={() => { setselectedTab('masking') }} className={`tab_item ${selectedTab === 'masking' && "active"}`}>Сreate custom masking rule</div>
                    <div onClick={() => { setselectedTab('list') }} className={`tab_item tab_item_last ${selectedTab === 'list' && "active"}`}>Masking with custom list</div>
                </div>

                {
                    ReturnTutorialElement()
                }

            </div>
        </section>
    )
}

export default React.memo(Tutorial)