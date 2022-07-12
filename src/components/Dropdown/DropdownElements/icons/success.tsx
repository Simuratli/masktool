import React from 'react'
import { DropdownSuccessIcon } from '../../Dropdown.types'

function success({ success, noDrop }: DropdownSuccessIcon) {
    switch (success) {
        case false:
            return (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5ZM1.125 7.5C1.125 3.97918 3.97918 1.125 7.5 1.125C11.0208 1.125 13.875 3.97918 13.875 7.5C13.875 11.0208 11.0208 13.875 7.5 13.875C3.97918 13.875 1.125 11.0208 1.125 7.5Z" fill="#80BB5B" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 1.125C3.97918 1.125 1.125 3.97918 1.125 7.5C1.125 11.0208 3.97918 13.875 7.5 13.875C11.0208 13.875 13.875 11.0208 13.875 7.5C13.875 3.97918 11.0208 1.125 7.5 1.125ZM9.91475 5.22725L6.5625 8.5795L5.08525 7.10225L5.02216 7.04779C4.80195 6.8844 4.48945 6.90255 4.28975 7.10225C4.07008 7.32192 4.07008 7.67808 4.28975 7.89775L6.16475 9.77275L6.22784 9.82721C6.44805 9.9906 6.76055 9.97245 6.96025 9.77275L10.7102 6.02275L10.7647 5.95966C10.9281 5.73945 10.9099 5.42695 10.7102 5.22725C10.4906 5.00758 10.1344 5.00758 9.91475 5.22725Z" fill="#80BB5B" />
                </svg>
            )
        case true:
            return (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="15" height="15" rx="7.5" fill="#CE1E1E" />
                    <rect x="4" y="5.08105" width="1.52298" height="8.3764" transform="rotate(-45 4 5.08105)" fill="#FEFEFF" />
                    <rect x="5.07812" y="10.9136" width="1.52298" height="8.3764" transform="rotate(-135 5.07812 10.9136)" fill="#FEFEFF" />
                </svg>
            )
        case null:
            if (noDrop) {
                return <></>
            } else {
                return (
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="25" height="25" rx="12.5" fill="#696D8C" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.97882 10.9632C7.28392 10.6581 7.77858 10.6581 8.08368 10.9632L13 15.8795L17.9163 10.9632C18.2214 10.6581 18.7161 10.6581 19.0212 10.9632C19.3263 11.2683 19.3263 11.763 19.0212 12.0681L13.5524 17.5368C13.2473 17.8419 12.7527 17.8419 12.4476 17.5368L6.97882 12.0681C6.67373 11.763 6.67373 11.2683 6.97882 10.9632Z" fill="white" />
                    </svg>
                )
            }
        default:
            if (noDrop) {
                return <></>
            } else {
                return (
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="25" height="25" rx="12.5" fill="#696D8C" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.97882 10.9632C7.28392 10.6581 7.77858 10.6581 8.08368 10.9632L13 15.8795L17.9163 10.9632C18.2214 10.6581 18.7161 10.6581 19.0212 10.9632C19.3263 11.2683 19.3263 11.763 19.0212 12.0681L13.5524 17.5368C13.2473 17.8419 12.7527 17.8419 12.4476 17.5368L6.97882 12.0681C6.67373 11.763 6.67373 11.2683 6.97882 10.9632Z" fill="white" />
                    </svg>
                )
            }
    }
}

export default React.memo(success)