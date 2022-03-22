import { Dvider } from './'
import { ProgresItemPropTypes } from '../progress.types'

function PorgressItem({ icon, text, id, disabled }: ProgresItemPropTypes) {
    return (
        <>
            <div className={`progress__item ${disabled && 'progress__item--disable'}`}>
                <span className='progress__item__text'>{text}</span>
                {icon}
            </div>
            {id !== 4 && <Dvider />}
        </>
    )
}

export default PorgressItem