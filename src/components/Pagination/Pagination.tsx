import React from 'react'
import Select from '../Select'

function Pagination() {

    let Pages = [5, 10, 20, 'All']


    let Pagination_options = Pages.map((page) => {
        return <div key={page} className="select__dropdown__element">
            <span className="select__dropdown__element__text">{page}</span>
        </div>
    })



    return (
        <div className='pagination'>
            <div className="pagination__text">Rows per page</div>
            <Select placeholder={"1-5"} type="small" data={Pagination_options} />
            <div className="pagination__text">of 20</div>
            <button disabled className="pagination__button">
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.47124 11.1381C6.73159 10.8777 6.73159 10.4556 6.47124 10.1952L2.27598 5.99998L6.47124 1.80472C6.73159 1.54437 6.73159 1.12226 6.47124 0.861909C6.21089 0.60156 5.78878 0.60156 5.52843 0.861909L0.861766 5.52858C0.601416 5.78892 0.601416 6.21104 0.861766 6.47138L5.52843 11.1381C5.78878 11.3984 6.21089 11.3984 6.47124 11.1381Z" fill="#696D8C" />
                </svg>
            </button>
            <button className="pagination__button">
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.528757 11.1381C0.268407 10.8777 0.268407 10.4556 0.528757 10.1952L4.72402 5.99998L0.528758 1.80472C0.268408 1.54437 0.268408 1.12226 0.528758 0.861909C0.789107 0.60156 1.21122 0.60156 1.47157 0.861909L6.13823 5.52858C6.39858 5.78892 6.39858 6.21104 6.13823 6.47138L1.47157 11.1381C1.21122 11.3984 0.789106 11.3984 0.528757 11.1381Z" fill="#1E2432" />
                </svg>
            </button>
        </div>
    )
}

export default React.memo(Pagination)