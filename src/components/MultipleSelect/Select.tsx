import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Checkbox, SelectHeader } from '../'
import { DeleteIcon } from './icons'


function Select() {
    const [text, setText] = useState<String[]>([])
    const [toggleElements, setToggleElements] = useState(false)
    let FAKE_DATA = ["Data rule", "Text rule", "Money Rule", "Multiline rules"]
    const ref = useRef<HTMLDivElement>(null)

    const toggle = useCallback(
        () => {
            setToggleElements((prev) => !prev)
        },
        [],
    )

    let arrayOfOptions: String[] = []

    const chose = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            arrayOfOptions = [...text, e.target.value]
        } else {
            arrayOfOptions = text.filter(word => word !== e.target.value);
        }
        setText(arrayOfOptions)
    }

    useEffect(() => {
        const checkIfClickedOutside = (e:any) => {
            console.log(e)
            if (toggleElements && ref.current && !ref.current.contains(e.target)) {
                setToggleElements(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [toggleElements])


    const deleteFunc = (item: String) => {
        const result = text.filter(word => word !== item);
        setText(result)
    }

    return (
        <div className='multiple__select' ref={ref}>
            <SelectHeader IconClick={toggle} iconProp={toggleElements}>
                {text.length === 0 ? "Choose rule type" : text.map((item, index) => {
                    return <span key={index} className="multiple__select__main__badge">
                        {item}
                        <DeleteIcon deleteFunc={() => { deleteFunc(item) }} />
                    </span>
                })}
            </SelectHeader>
            <div className={`multiple__select__elemets ${toggleElements && "open"}`}>
                {
                    FAKE_DATA.map((rule) => {
                        return <div key={rule} className="multiple__select__elemets__item" >
                            <Checkbox checked={text.includes(rule)} value={rule} text={rule} onChange={chose} />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default React.memo(Select)