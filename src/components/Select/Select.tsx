import React, { useState, useEffect, useRef } from 'react'
import { SelectHeader } from '../'

function Select({ data, placeholder }: any) {
    const [toggleElements, settoggleElements] = useState(false)
    const [selectedElement, setSelectedElement] = useState<string | null>('')
    const ref = useRef<HTMLDivElement>(null)

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


    const selectItem = (e: React.MouseEvent<HTMLSpanElement>) => {
        const input = e.target as HTMLElement;
        setSelectedElement(input.textContent)
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
        <div className='select' ref={ref}>
            <SelectHeader onClick={() => { settoggleElements((prev) => !prev) }} iconProp={toggleElements}>
                {selectedElement === "" ? placeholder : selectedElement}
            </SelectHeader>

            <div className={`select__dropdown ${toggleElements && 'open'}`}>
                {data}

                {/* FAKE_DATA.map((data) => {
        return <div key={data.name}>
            <div key={data.name} className="select__dropdown__element">
                <span className="select__dropdown__element__text select__dropdown__element__text--header">{data.name}</span>
            </div>
            {data.item.map((item) => {
                return <div onClick={() => { settoggleElements((prev) => !prev) }} key={item} className="select__dropdown__element">
                    <span onClick={selectItem} className="select__dropdown__element__text">{item}</span>
                    <span className="select__dropdown__element__icon">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="15" height="15" rx="7.5" fill="#CE1E1E" />
                            <rect x="4" y="5.08105" width="1.52298" height="8.3764" transform="rotate(-45 4 5.08105)" fill="#FEFEFF" />
                            <rect x="5.07715" y="10.9136" width="1.52298" height="8.3764" transform="rotate(-135 5.07715 10.9136)" fill="#FEFEFF" />
                        </svg>
                    </span>
                </div>
            })}

        </div>
    }) */}

            </div>
        </div>
    )
}

export default React.memo(Select)