import React from 'react'
import { useSelector } from 'react-redux'
import { ReducerType } from '../../../redux/reducers/reducer.types'

function MaskingWithCustomList() {


    const vocabularyListState = useSelector((state: ReducerType) => state.vocabularyListReducer)

    return (
        <>
            <div className="tutorial__container">

                <div className="tutorial__content">
                    <p className='tutorial__text'>
                        Want to replace values in the text fields with data from the custom list?
                    </p>
                    <h2 className="tutorial__text"><span className="orange"><strong>Step 1.</strong></span> <strong>Create and add</strong></h2>
                    <p className='tutorial__text'>
                        You should first create a custom list and add it to UDS Business Data Masking. Use the guide <a download rel="noreferrer" target="_blank" href='https://raw.githubusercontent.com/Simuratli/masktool/ac5926c4091c0e5ae0c55fd9f449d2eea7f1744f/files/uds-business-data-masking-adding-lists-guide.pdf' className="orange click">How to add custom lists</a>.
                    </p>

                    <h2 className="tutorial__text"><span className="orange"><strong>Step 2.</strong></span> <strong>Check</strong></h2>

                    <p className='tutorial__text'>
                        Check if your list has appeared among the default List rule parameters:
                    </p>
                    <ul className='list'>
                        {
                            vocabularyListState.names.map((item) => {
                                return <li>{item};</li>
                            })
                        }
{/* 
                        <li>Last names;</li>
                        <li>Countries;</li>
                        <li>Cities;</li>
                        <li>Companies;</li>
                        <li>Email domains.;</li>
                        <li><strong>The title of your list.</strong></li> */}
                    </ul>

                    <h2 className="tutorial__text"><span className="orange"><strong>Step 3.</strong> </span><strong>Apply</strong></h2>
                    <p className='tutorial__text'>
                        Apply a List rule with the parameter <strong>‘The title of your list’</strong> to needed fields.
                    </p>

                </div>


                <div className="tutorial__video">
                    <a download rel="noreferrer" target="_blank" href='https://raw.githubusercontent.com/Simuratli/masktool/ac5926c4091c0e5ae0c55fd9f449d2eea7f1744f/files/uds-business-data-masking-adding-lists-guide.pdf' >
                        <img src="https://i.imgur.com/6J1Hui8.png" alt="uds" />
                    </a>
                </div>
            </div>
        </>
    )
}

export default MaskingWithCustomList