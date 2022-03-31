import React from 'react'

interface DownPropTypes {
    toggleElements:Boolean
}

function Down({toggleElements}:DownPropTypes) {
    return (
        <svg className={`${toggleElements && "rotate"}`} width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.146447 0.146447C0.341709 -0.0488155 0.658291 -0.0488155 0.853553 0.146447L4 3.29289L7.14645 0.146447C7.34171 -0.0488155 7.65829 -0.0488155 7.85355 0.146447C8.04882 0.341709 8.04882 0.658291 7.85355 0.853553L4.35355 4.35355C4.15829 4.54882 3.84171 4.54882 3.64645 4.35355L0.146447 0.853553C-0.0488155 0.658291 -0.0488155 0.341709 0.146447 0.146447Z" fill="#1E2432" />
        </svg>
    )
}

export default Down