import React, { useState, useRef, useEffect } from 'react'
import Calendar from './Calendar'

function CalendarContainer() {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const checkIfClickedOutside = (e: any) => {
            if (open && ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [open])

    return (
        <div className='calendar__container' ref={ref}>
            <div onClick={() => { setOpen(prev => !prev) }} className="calendar__container__header">
                <span className='calendar__container__text'>23.10.19-31.10.19</span>
                <span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.75 0C16.5449 0 18 1.45507 18 3.25V14.75C18 16.5449 16.5449 18 14.75 18H3.25C1.45507 18 0 16.5449 0 14.75V3.25C0 1.45507 1.45507 0 3.25 0H14.75ZM16.5 5.5H1.5V14.75C1.5 15.7165 2.2835 16.5 3.25 16.5H14.75C15.7165 16.5 16.5 15.7165 16.5 14.75V5.5ZM4.75 11.5C5.44036 11.5 6 12.0596 6 12.75C6 13.4404 5.44036 14 4.75 14C4.05964 14 3.5 13.4404 3.5 12.75C3.5 12.0596 4.05964 11.5 4.75 11.5ZM9 11.5C9.69036 11.5 10.25 12.0596 10.25 12.75C10.25 13.4404 9.69036 14 9 14C8.30964 14 7.75 13.4404 7.75 12.75C7.75 12.0596 8.30964 11.5 9 11.5ZM4.75 7.5C5.44036 7.5 6 8.05964 6 8.75C6 9.44035 5.44036 10 4.75 10C4.05964 10 3.5 9.44035 3.5 8.75C3.5 8.05964 4.05964 7.5 4.75 7.5ZM9 7.5C9.69036 7.5 10.25 8.05964 10.25 8.75C10.25 9.44035 9.69036 10 9 10C8.30964 10 7.75 9.44035 7.75 8.75C7.75 8.05964 8.30964 7.5 9 7.5ZM13.25 7.5C13.9404 7.5 14.5 8.05964 14.5 8.75C14.5 9.44035 13.9404 10 13.25 10C12.5596 10 12 9.44035 12 8.75C12 8.05964 12.5596 7.5 13.25 7.5ZM14.75 1.5H3.25C2.2835 1.5 1.5 2.2835 1.5 3.25V4H16.5V3.25C16.5 2.2835 15.7165 1.5 14.75 1.5Z" fill="#1A4F95" />
                    </svg>
                </span>
            </div>
            <div className={`calendar__container__content ${open && 'open'}`}>
                <Calendar />
            </div>
        </div>
    )
}

export default React.memo(CalendarContainer)