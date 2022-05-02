import React from 'react'

function TableChosenValue({ rule, value }: any) {
    if (rule === "RandomLetter" || rule === "RandomLetters" || rule === 14) {
        return (
            <div className="table__cell__chosen">{value ? `${value} symbols` : `0 symbol`} </div>
        )
    }
    else if (rule === "ClearValue") {
        return (
            <div className="table__cell__chosen">Clear value</div>
        )
    }
    else if (rule === "RandomDate" || rule === 2) {
        return (
            <div className="table__cell__chosen">{value}</div>
        )
    }
    else if (rule === "RandomLine" || rule === 7 || rule === "CustomRule") {
        return (
            <div className="table__cell__chosen">{value}</div>
        )
    }
    else if (rule === "Email") {
        return (
            <div className="table__cell__chosen">Email</div>
        )
    }
    else {
        return (
            <div className="table__cell__chosen"></div>
        )
    }
}

export default React.memo(TableChosenValue)