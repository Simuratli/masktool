import React from 'react'
interface PaginationIconType {
    type?: string
}

function Icon({ type }: PaginationIconType) {
    return (
        <svg style={{ transform: `${type === 'next' && "rotate(180deg)"}` }} width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.47124 11.1381C6.73159 10.8777 6.73159 10.4556 6.47124 10.1952L2.27598 5.99998L6.47124 1.80472C6.73159 1.54437 6.73159 1.12226 6.47124 0.861909C6.21089 0.60156 5.78878 0.60156 5.52843 0.861909L0.861766 5.52858C0.601416 5.78892 0.601416 6.21104 0.861766 6.47138L5.52843 11.1381C5.78878 11.3984 6.21089 11.3984 6.47124 11.1381Z" fill="#696D8C" />
        </svg>
    )
}

export default React.memo(Icon)