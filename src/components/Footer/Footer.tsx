import React from 'react'
import Mail from './icons/mail'
import Skype from './icons/skype'
import Header from '../Header'

function Footer() {
    return (
        <footer className='footer'>
            <Header headerType="big" text="Need help?" />
            <p className="footer__text">Feel free to contact us by Skype or Email</p>
            <div className="footer__icons">
                <a href="mailto: abc@example.com" className="mail">
                    <Mail/> <span>portal@uds.systems</span>
                </a>
                <a href="skype:uds.systems?chat" className="mail">
                    <Skype/> <span>uds.systems</span>
                </a>
                
            </div>
        </footer>
    )
}

export default React.memo(Footer)