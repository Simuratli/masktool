import React from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

function CalendarM({ onChange, date }: any) {


    return (
        <div className='calendar'>
            <DateRange
                editableDateInputs={true}
                onChange={onChange}
                moveRangeOnFirstSelection={false}
                ranges={date}
                dateDisplayFormat="MM/dd/yyyy"
                color="#1A4F95"
                // minDate={new Date()}
                rangeColors={["#1A4F95"]}
            />
        </div>
    )
}

export default React.memo(CalendarM)