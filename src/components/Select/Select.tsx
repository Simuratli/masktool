import React, { useState, useCallback } from 'react'

function Select() {
    const [text, setText] = useState("Choose rule type")
    const [toggleElements, setToggleElements] = useState(false)

    const toggle = useCallback(
        () => {
            setToggleElements((prev)=>!prev)
        },
        [],
    )

    return (
        <div onClick={toggle} className='select'>
            <div className="select__main">
                <span className="select__main__text">{text}</span>
                <span className={`select__main__icon`}>
                    <svg className={`${toggleElements && "rotate"}`} width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.146447 0.146447C0.341709 -0.0488155 0.658291 -0.0488155 0.853553 0.146447L4 3.29289L7.14645 0.146447C7.34171 -0.0488155 7.65829 -0.0488155 7.85355 0.146447C8.04882 0.341709 8.04882 0.658291 7.85355 0.853553L4.35355 4.35355C4.15829 4.54882 3.84171 4.54882 3.64645 4.35355L0.146447 0.853553C-0.0488155 0.658291 -0.0488155 0.341709 0.146447 0.146447Z" fill="#1E2432" />
                    </svg>
                </span>
            </div>
            <div className={`select__elemets ${toggleElements && "open"}`}>
                <span className="select__elemets__item">Item 1</span>
                <span className="select__elemets__item">Item 2</span>
                <span className="select__elemets__item">Item 3</span>
                <span className="select__elemets__item">Item 4</span>
            </div>
        </div>
    )
}

export default React.memo(Select)