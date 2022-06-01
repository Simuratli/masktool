import React from 'react'

function MaskingWithCustomList() {
    return (
        <>
            <div className="tutorial__container">

                <div className="tutorial__content">
                    <p className='tutorial__text'>
                        Want to replace values in the text fields with data from the custom list?
                    </p>
                    <h2 className="tutorial__heading__second"><span className="orange">Step 1</span> <strong>Create and add</strong></h2>
                    <p className='tutorial__text'>
                        You should first create a custom list and add it to UDS Business Data Masking. Use the guide <span className="orange">How to add custom lists</span>.
                    </p>

                    <h2 className="tutorial__heading__second"><span className="orange">Step 2</span> <strong>Check</strong></h2>

                    <p className='tutorial__text'>
                        Check if your list has appeared among the default List rule parameters:
                    </p>
                    <ul className='list'>
                        <li>Names;</li>
                        <li>Last names;</li>
                        <li>Countries;</li>
                        <li>Cities;</li>
                        <li>Companies;</li>
                        <li>Email dmains.;</li>
                        <li><strong>The title of your list.</strong></li>
                    </ul>

                    <h2 className="tutorial__heading__second"><span className="orange">Step 3 </span><strong>Apply</strong></h2>
                    <p className='tutorial__text'>
                        Apply a List rule with the parameter ‘The title of your list’ to needed fields.
                    </p>

                </div>


                <div className="tutorial__video">
                    <img src="https://i.imgur.com/fvh6CbA.png" alt="uds" />

                </div>
            </div>
        </>
    )
}

export default MaskingWithCustomList