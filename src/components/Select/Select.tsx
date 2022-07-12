import React, { useState, useEffect, useRef } from 'react'
import { SelectPropTypes } from './select.types'
import { SelectHeader } from '../'

function Select({ data, placeholder, type, customData, onChange, deletableData, disabled, deleteLoader, choseSaved, deleteSavedParam, selectedValueForRule, pagination }: SelectPropTypes) {
    const [toggleElements, settoggleElements] = useState(false)
    const [selectedElement, setSelectedElement] = useState<string | null>('')
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setSelectedElement(selectedValueForRule ? selectedValueForRule : "")
    }, [choseSaved, selectedValueForRule])


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
        <div className={`select ${disabled && 'disabled'} ${type}`} ref={ref}>
            <SelectHeader onClick={() => { !disabled && settoggleElements((prev) => !prev) }} iconProp={toggleElements}>
                {selectedElement === "" ? placeholder : (pagination ? `${pagination}-${selectedElement}` : selectedElement)}
            </SelectHeader>

            <div className={`select__dropdown ${toggleElements && 'open'}`}>
                {customData && customData}

                {
                    data && data.map((item: string | number) => {
                        return <div onClick={selectItem} key={item} className="select__dropdown__element">
                            <span className="select__dropdown__element__text">{item}</span>
                        </div>
                    })
                }



                {
                    deletableData && !deleteLoader && deletableData.filter((cat) => cat.data.length !== 0).map((category) => {
                        return <>
                            <div onClick={() => { }} key={category.name} className="select__dropdown__element">
                                <span className="select__dropdown__element__text--header">{category.name}</span>
                            </div>
                            {
                                category.data.map((item: any) => {
                                    return <div onClick={() => { }} key={item} className="select__dropdown__element">
                                        <span onClick={() => { choseSaved(item, category.name); settoggleElements(false) }} className="select__dropdown__element__text">{item}</span>
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
                }
            </div>
        </div>
    )
}

export default React.memo(Select)