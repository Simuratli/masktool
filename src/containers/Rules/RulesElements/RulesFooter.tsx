import React from 'react'
import { useDispatch } from 'react-redux';
import { Button } from '../../../components';
import { setToggleModal } from '../../../redux/actions';

function RulesFooter() {
    const dispatch = useDispatch();

    return (
        <div className="rules__button">
            <Button onClick={() => { dispatch(setToggleModal(true)) }} text="RUN" />
        </div>
    )
}

export default React.memo(RulesFooter)