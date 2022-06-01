import React from 'react'

function HowToUse() {
    return (
        <div className="tutorial__container">

            <div className="tutorial__content">
                <h2 className="tutorial__heading__second">Default settings</h2>
                <p className='tutorial__text'>
                    All records will be deleted in 9 entities: <strong>Fax, Email, Letter, Phonecall, Socialprofile, Activityfile, Attachment, Activitymimeattachment, Annotation,</strong> and <strong>Attachment</strong>.
                </p>
                <p className='tutorial__text'>
                    Fields in <strong>Account, Contact,</strong> and <strong>Lead</strong> entities will be masked according to the points below.
                </p>
                <h2 className="tutorial__heading__second">Point 1</h2>
                <table className='tutorial__table'>
                    <thead>
                        <tr>
                            <td>field</td>
                            <td>Data will be replaced with</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>address1_city</td>
                            <td>a default list of cities</td>
                        </tr>
                        <tr>
                            <td>address1_country</td>
                            <td>a default list of the countries</td>
                        </tr>
                        <tr>
                            <td>name, companyname</td>
                            <td>a default list of company names</td>
                        </tr>
                        <tr>
                            <td>firstname</td>
                            <td>a default list of first names</td>
                        </tr>
                        <tr>
                            <td>lastname</td>
                            <td>a default list of last names</td>
                        </tr>
                        <tr>
                            <td>address1_line1, address1_line2, address1_line3, address1_name</td>
                            <td>8 random letters</td>
                        </tr>
                        <tr>
                            <td>emailaddress1</td>
                            <td>8 random letters before @, 3 random letters after @, and a random domain from the default list, like abcdefgh@ijk.domain</td>
                        </tr>
                    </tbody>
                </table>
                <h2 className="tutorial__heading__second">Point 2</h2>
                <p className='tutorial__text'>UDS Business Data Masking will clear values in the rest of the text, multiline, and date fields.</p>
                <h2 className="tutorial__heading__second">Default masking flow</h2>
                <h3 className="tutorial__heading__third"><span className="tutorial__heading__step">Step 1.</span> Run masking </h3>
                <p className='tutorial__text'>Open the Masking settings tab on the ribbon, and click Run to proceed with default settings.</p>
                <h3 className="tutorial__heading__third"><span className="tutorial__heading__step">Step 2.</span> Check the results</h3>
                <p className='tutorial__text'>Wait for the report on the masking completion. If masking of some entities failed, download logs and change the masking settings accordingly. Click Run to start the new masking. </p>
            </div>


            <div className="tutorial__video">
                <iframe width="674" height="418" src="https://www.youtube.com/embed/PHklnuOvxfg" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        </div>
    )
}

export default HowToUse