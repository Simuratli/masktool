import React, { useState, useEffect, useRef } from 'react'
import { SelectPropTypes } from './select.types'
import { SelectHeader } from '../'

function Select({ data, placeholder, type, customData, onChange }: SelectPropTypes) {
    const [toggleElements, settoggleElements] = useState(false)
    const [selectedElement, setSelectedElement] = useState<string | null>('')
    const ref = useRef<HTMLDivElement>(null)

    const selectItem = (e: React.MouseEvent<HTMLSpanElement>) => {
        const input = e.target as HTMLElement;
        setSelectedElement(input.textContent)
        settoggleElements(false)
        if (onChange) onChange(input.textContent)
    }

    useEffect(() => {
        const checkIfClickedOutside = (e: any) => {
            if (toggleElements && ref.current && !ref.current.contains(e.target)) {
                settoggleElements(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [toggleElements])


    return (
        <div className={`select ${type}`} ref={ref}>
            <SelectHeader onClick={() => { settoggleElements((prev) => !prev) }} iconProp={toggleElements}>
                {selectedElement === "" ? placeholder : selectedElement}
            </SelectHeader>

            <div className={`select__dropdown ${toggleElements && 'open'}`}>
                {customData && customData}

                {
                    data && data.map((item: string) => {
                        return <div onClick={selectItem} key={item} className="select__dropdown__element">
                            <span className="select__dropdown__element__text">{item}</span>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default React.memo(Select)