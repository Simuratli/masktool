import React from 'react'
import { DownIcon } from '../MultipleSelect/icons'

function SelectHeader({ children, onClick, iconProp,IconClick }: any) {
    return (
        <div onClick={onClick} className="multiple__select__main">
            <span className="multiple__select__main__text">
                {children}
            </span>
            <span onClick={IconClick} className={`multiple__select__main__icon`}>
                <DownIcon  toggleElements={iconProp} />
            </span>
        </div>
    )
}

export default React.memo(SelectHeader)