import React from 'react'

function TableCell({ children }: any) {
    return (
        <div className='table__cell'>
            {children}
        </div>
    )
}

export default React.memo(TableCell)