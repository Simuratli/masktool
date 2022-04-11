import React, { useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

function CalendarM() {

    const [date, setDate] = useState(
        [
            {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
            }
        ]
    )


    let onChangeDate = (item:any) => {
        let selection = item.selection;
        setDate([selection])
    }

    return (
        <div className='calendar'>
            <DateRange
                editableDateInputs={false}
                onChange={onChangeDate}
                moveRangeOnFirstSelection={false}
                ranges={date}
                dateDisplayFormat="dd/MM/yyyy"
                color="#1A4F95"
                minDate={new Date()}
                rangeColors={["#1A4F95"]}
            />
        </div>
    )
}

export default React.memo(CalendarM)