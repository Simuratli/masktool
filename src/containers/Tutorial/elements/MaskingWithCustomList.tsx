import React from 'react'

function MaskingWithCustomList() {
    return (
        <>
            <div className="tutorial__container">

                <div className="tutorial__content">
                    <p className='tutorial__text'>
                        Want to replace values in the text fields with data from the custom list?
                    </p>
                    <h2 className="tutorial__text"><span className="orange"><strong>Step 1.</strong></span> <strong>Create and add</strong></h2>
                    <p className='tutorial__text'>
                        You should first create a custom list and add it to UDS Business Data Masking. Use the guide <a download rel="noreferrer" target="_blank"  href='https://raw.githubusercontent.com/Simuratli/masktool/f29f3fdb23d8313657adc4ccb640a8dca654f258/files/How%20to%20create%20custom%20masking%20lists.%20Guide%20for%20UDS%20Business%20Data%20Masking.pdf' className="orange click">How to add custom lists</a>.
                    </p>

                    <h2 className="tutorial__text"><span className="orange"><strong>Step 2.</strong></span> <strong>Check</strong></h2>

                    <p className='tutorial__text'>
                        Check if your list has appeared among the default List rule parameters:
                    </p>
                    <ul className='list'>
                        <li>Names;</li>
                        <li>Last names;</li>
                        <li>Countries;</li>
                        <li>Cities;</li>
                        <li>Companies;</li>
                        <li>Email domains.;</li>
                        <li><strong>The title of your list.</strong></li>
                    </ul>

                    <h2 className="tutorial__text"><span className="orange"><strong>Step 3.</strong> </span><strong>Apply</strong></h2>
                    <p className='tutorial__text'>
                        Apply a List rule with the parameter <strong>‘The title of your list’</strong> to needed fields.
                    </p>

                </div>


                <div className="tutorial__video">
                    <img  src="https://i.imgur.com/6J1Hui8.png" alt="uds" />

                </div>
            </div>
        </>
    )
}

export default MaskingWithCustomList