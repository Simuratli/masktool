import React from 'react'

function MaskingRulesSavedItems() {

    let FAKE_DATA = [
        {
            name: "Text rules",
            item: ["Custom 1", "Custom 2", "Custom 3"]
        },
        {
            name: "Data rules",
            item: ["Custom 6", "Custom 7", "Custom 9"]
        }
    ]

    return (
        <div className="masking__rules__right__saved">
            <p className="masking__rules__right__saved__header">
                Your last saved parameters:
            </p>
            {FAKE_DATA.map((data) => {
                return <div key={data.name}>
                    <p key={data.name} className="masking__rules__right__saved__main">{data.name}</p>
                    {data.item.map(item => {
                        return <p key={item} className="masking__rules__right__saved__item">{item}</p>
                    })}
                </div>
            })}
        </div>
    )
}

export default React.memo(MaskingRulesSavedItems)