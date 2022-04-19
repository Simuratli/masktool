import React from 'react'
import { useDispatch } from 'react-redux';
import { Button } from '../../../components';
import { setStep } from '../../../redux/actions';

function RulesFooter() {
    const dispatch = useDispatch();

    return (
        <div className="rules__button">
            <Button onClick={() => { dispatch(setStep('progress')) }} text="RUN" />
        </div>
    )
}

export default React.memo(RulesFooter)