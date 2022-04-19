import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Checkbox, SelectHeader } from '../'
import { DeleteIcon } from './icons'
import { MultiplePropTypes } from './multipleSelect.types'


function Select({ chose, values, deleteFunc, placeholder, data }: MultiplePropTypes) {

    const [toggleElements, setToggleElements] = useState(false)


    const ref = useRef<HTMLDivElement>(null)

    const toggle = useCallback(
        () => {
            setToggleElements((prev) => !prev)
        },
        [],
    )

    useEffect(() => {
        const checkIfClickedOutside = (e: any) => {
            if (toggleElements && ref.current && !ref.current.contains(e.target)) {
                setToggleElements(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [toggleElements])


    return (
        <div className='multiple__select' ref={ref}>
            <SelectHeader IconClick={toggle} iconProp={toggleElements}>
                {values.length === 0 ? <span onClick={()=>{setToggleElements((prev)=>!prev)}}>{ placeholder }</span> : values.map((item: string, index: number) => {
                    return <span key={index} className="multiple__select__main__badge">
                        <span>{item}</span>
                        <DeleteIcon deleteFunc={() => { deleteFunc(item) }} />
                    </span>
                })}
            </SelectHeader>
            <div className={`multiple__select__elemets ${toggleElements && "open"}`}>
                {
                    data.map((rule: string, index: number) => {
                        return <div key={index} className="multiple__select__elemets__item" >
                            <Checkbox checked={values.includes(rule)} value={rule} text={rule} onChange={chose} />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default React.memo(Select)