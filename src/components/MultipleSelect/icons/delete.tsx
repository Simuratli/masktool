import React from 'react'

interface DownPropTypes {
    deleteFunc: () => void,
}

function Delete({ deleteFunc }: DownPropTypes) {
    return (
        <svg onClick={deleteFunc} width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3.22412" y="3.62207" width="1.52298" height="8.3764" transform="rotate(-45 3.22412 3.62207)" fill="#696D8C" />
            <rect x="4.30127" y="9.45508" width="1.52298" height="8.3764" transform="rotate(-135 4.30127 9.45508)" fill="#696D8C" />
        </svg>
    )
}

export default Delete