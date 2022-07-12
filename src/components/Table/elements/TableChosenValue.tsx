import React from 'react'

function TableChosenValue({ rule, value }: any) {
    if (rule === "Random letter" || rule === "Random letters" || rule === 14 || rule === "Multi line" || rule === 7) {
        return (
            <div className="table__cell__chosen">{value ? `${value} symbols` : `0 symbol`} </div>
        )
    }
    else if (rule === "Clear value") {
        return (
            <div className="table__cell__chosen">Clear value</div>
        )
    }
    else if (rule === "Random date" || rule === 2) {
        return (
            <div className="table__cell__chosen">{value}</div>
        )
    }
    else if (rule === "List" || rule === 7 || rule === "Custom rule") {
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

export default TableChosenValue