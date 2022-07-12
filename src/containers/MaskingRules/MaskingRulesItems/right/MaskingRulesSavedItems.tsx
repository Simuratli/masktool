import React from 'react'
import { ReducerType } from '../../../../redux/reducers/reducer.types'
import { useSelector } from 'react-redux'

function MaskingRulesSavedItems() {
    const customRulesState = useSelector((state: ReducerType) => state.customRulesReducer)


    return (
        <div className="masking__rules__right__saved">
            {
                customRulesState.categorized.length !== 0 && <>
                    <p className="masking__rules__right__saved__header">
                        Your last saved parameters:
                    </p>

                    <div className='masking__rules__right__saved__container'>
                        {
                            customRulesState.categorized.filter((category) => category.data.length !== 0).map((item) => {
                                return <div>
                                    <p className="masking__rules__right__saved__main">{item.name}</p>
                                    {
                                        item.data.slice(0, 3).map((data) => {
                                            return <p className="masking__rules__right__saved__item">{data}</p>
                                        })
                                    }
                                </div>
                            })
                        }
                    </div>
                </>
            }

        </div>
    )
}

export default React.memo(MaskingRulesSavedItems)