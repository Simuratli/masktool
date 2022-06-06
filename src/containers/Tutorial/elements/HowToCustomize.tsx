import React from 'react'
import TutorialDropdown from './TutorialDropdown'
import { setStep } from '../../../redux/actions';
import { useDispatch } from 'react-redux'

function HowToCustomize() {

    const dispatch = useDispatch()

    return (
        <>
            <div className="tutorial__container">

                <div className="tutorial__content">
                    <p className='tutorial__text'>
                        Proceed with the steps below to make custom Business Data Masking settings.
                    </p>
                    <h2 className="tutorial__text"><span className="orange"><strong>Step 1</strong></span> <strong>Choose entities and views </strong></h2>
                    <p className='tutorial__text'>
                        You can add more entities to the UDS Business Data Masking by clicking the <strong>Add entity</strong> button. You can remove entities that will not be changed by clicking the <strong>bin icon</strong> near them.
                    </p>
                    <p className='tutorial__text'>
                        Choose the needed views for each entity from the drop-down list.
                    </p>

                    <h2 className="tutorial__text"><span className="orange"><strong>Step 2</strong></span> <strong>Specify your goals </strong></h2>
                    <p className='tutorial__text'>
                        Mark <strong>Delete</strong> if you want to clear values in all fields within the chosen entity/view. Or mark <strong>Masking</strong> to replace true business data with templates (it will be available to clear some fields, if necessary).
                    </p>
                    <h2 className="tutorial__text"><span className="orange"><strong>Step 3</strong></span> <strong>Set masking rules</strong></h2>
                    <p className='tutorial__text'>
                        If your goal is <strong>Masking</strong>, you can choose what masking rule will be applied to each field. Also, you can mark any field as <strong>No masking</strong> to leave the value in this field without changes.
                    </p>
                    <p className='tutorial__text'>
                        Available rules will depend on the field type.
                    </p>


                </div>


                <div className="tutorial__video">
                    <iframe width="674" height="418" src="https://www.youtube.com/embed/PHklnuOvxfg" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
            <TutorialDropdown badge='For text fields' name='Rule 1. List'>
                <p className='tutorial__text'>
                    The unwanted text will be replaced with the data from the list. You can choose one of the 6 default lists:
                </p>

                <ul className='list'>
                    <li>Names;</li>
                    <li>Last names;</li>
                    <li>Countries;</li>
                    <li>Cities;</li>
                    <li>Companies;</li>
                    <li>Email dmains.;</li>
                </ul>

                <p className='tutorial__text'>
                    Or you can use your own list. Download the guide on <span className="orange">How to add custom lists</span>
                </p>
            </TutorialDropdown>
            <TutorialDropdown badge='For text and multiline fields' name='Rule 2. Random Letters'>
                <p className='tutorial__text'>
                    Data in text fields will be replaced with 8 random characters. You can change the number between 2 and 15.
                </p>
                <p className='tutorial__text'>
                    Data in multiline fields will be replaced with 15 random characters. You can change the number between 2 and 52.
                </p>
            </TutorialDropdown>

            <TutorialDropdown badge='For emails' name='Rule 3. Email'>
                <p className='tutorial__text'>
                    Masked email will contain 8 random letters before @, 3 random letters after @, and a random domain from the list (ex. abcdefgh@ijk.domain). You can change the number of letters on your own.
                </p>
            </TutorialDropdown>

            <TutorialDropdown badge='For all field types' name='Rule 4. Custom'>
                <p className='tutorial__text'>
                    You can create your own masking rule (ex. for a phone number) by mixing data from lists and using additional requirements. Click <span onClick={() => { dispatch(setStep('settings')) }} className="orange click">here</span> to open custom rules settings.
                </p>
            </TutorialDropdown>

            <TutorialDropdown badge='For all field types' name='Rule 5. Clear'>
                <p className='tutorial__text'>
                    You can clear the data in selected fields if you are sure it does not impact further work with the system.
                </p>
                <p className='tutorial__text'>
                    <span className="danger">Warning!</span> You shouldn’t apply Clear Rule to the required fields as it will cause errors.
                </p>
            </TutorialDropdown>

            <TutorialDropdown badge='For all field types' name='Rule 6. Range'>
                <p className='tutorial__text'>
                    Dates will be replaced with the last calendar year range (ex. from 1.01.2021 to 31.12.2021). You can also set your own range for each date field. Use the calendar or set the range manually.
                </p>
            </TutorialDropdown>
            <br />
            <h2 className="tutorial__text"><span className="orange"><strong>Step 4</strong></span> <strong>Apply changes </strong></h2>
            <p className='tutorial__text'>
                Make sure that all settings for all entities and views are correct before clicking the <strong>Run button</strong>.
            </p>

            <h2 className="tutorial__text"><span className="orange"><strong>Step 5.</strong></span>  <strong>Check the results</strong></h2>
            <p className='tutorial__text'>
                Wait for the report on the masking completion. If the masking of some entities failed, download logs and change the masking settings accordingly. Click Run to start the new masking.
            </p>
        </>

    )
}

export default React.memo(HowToCustomize)