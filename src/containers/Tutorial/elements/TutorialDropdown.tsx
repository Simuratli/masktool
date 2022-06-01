import React, { useState } from 'react'

interface TutorialDropdownPropTypes {
    name: string;
    badge: string;
    children: React.ReactNode
}

function TutorialDropdown({ name, badge, children }: TutorialDropdownPropTypes) {

    const [open, setopen] = useState(false)

    return (
        <div className='tutorial__dropdown__container'>
            <div onClick={() => { setopen(prev => !prev) }} className="tutorial__dropdown__header">
                <svg style={{ transform: `${!open ? 'rotate(180deg)':'rotate(0deg)'}` }} width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.146447 4.85355C0.341709 5.04882 0.658291 5.04882 0.853553 4.85355L4 1.70711L7.14645 4.85355C7.34171 5.04882 7.65829 5.04882 7.85355 4.85355C8.04882 4.65829 8.04882 4.34171 7.85355 4.14645L4.35355 0.646447C4.15829 0.451184 3.84171 0.451184 3.64645 0.646447L0.146447 4.14645C-0.0488155 4.34171 -0.0488155 4.65829 0.146447 4.85355Z" fill="#696D8C" />
                </svg>
                <h1>{name}</h1>
                <span>{badge}</span>
            </div>
            <div className={`tutorial__dropdown__content ${open && 'open'}`}>
                {children}
            </div>
        </div>
    )
}

export default React.memo(TutorialDropdown)