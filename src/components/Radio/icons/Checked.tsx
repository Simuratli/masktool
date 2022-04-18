import React from 'react'
import { RadioCheckedPropTypes } from '../Radio.types'
function CheckedIcon({ checked, color }: RadioCheckedPropTypes) {

    return (
        <>
            {checked ? <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.9996 -0.0010376C16.5233 -0.0010376 21.0011 4.47681 21.0011 10.0005C21.0011 15.5242 16.5233 20.0021 10.9996 20.0021C5.47589 20.0021 0.998047 15.5242 0.998047 10.0005C0.998047 4.47681 5.47589 -0.0010376 10.9996 -0.0010376ZM10.9996 1.49896C6.30432 1.49896 2.49805 5.30524 2.49805 10.0005C2.49805 14.6958 6.30432 18.5021 10.9996 18.5021C15.6949 18.5021 19.5011 14.6958 19.5011 10.0005C19.5011 5.30524 15.6949 1.49896 10.9996 1.49896ZM10.9962 3.99896C14.3088 3.99896 16.9943 6.68441 16.9943 9.99708C16.9943 13.3097 14.3088 15.9952 10.9962 15.9952C7.68349 15.9952 4.99805 13.3097 4.99805 9.99708C4.99805 6.68441 7.68349 3.99896 10.9962 3.99896Z" fill={color} />
            </svg> : <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.9996 20.0021C16.5233 20.0021 21.0011 15.5242 21.0011 10.0005C21.0011 4.47681 16.5233 -0.0010376 10.9996 -0.0010376C5.47589 -0.0010376 0.998047 4.47681 0.998047 10.0005C0.998047 15.5242 5.47589 20.0021 10.9996 20.0021ZM10.9996 18.5021C6.30432 18.5021 2.49805 14.6958 2.49805 10.0005C2.49805 5.30524 6.30432 1.49896 10.9996 1.49896C15.6949 1.49896 19.5011 5.30524 19.5011 10.0005C19.5011 14.6958 15.6949 18.5021 10.9996 18.5021Z" fill={color} />
            </svg>}

        </>
    )
}

export default React.memo(CheckedIcon)