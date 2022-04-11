import React from 'react'
import { Button ,Modal } from '../../components'

function Rules() {
    return (
        <div className='rules'>
            <div className="rules__button">
                <Button text="ADD ENTITY" />
            </div>

            <div className="rules__drop">Slava Ukraini!</div>
            <div className="rules__drop">Slava Ukraini!</div>
            <div className="rules__drop">Slava Ukraini!</div>
            <div className="rules__drop">Slava Ukraini!</div>

            <div className="rules__button">
                <Button text="RUN" />
            </div>

            <Modal>
                Hellooo
            </Modal>
        </div>
    )
}

export default React.memo(Rules)