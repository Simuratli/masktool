import React from 'react'
import Mail from './icons/mail'
import Skype from './icons/skype'
import Header from '../Header'

function Footer() {
    return (
        <footer className='footer'>
            <Header headerType="big" text="Need help?" />
            <p className="footer__text">We are always happy to help you and offer the best discount.</p>
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

export default Footer