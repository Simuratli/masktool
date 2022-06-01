import React from 'react'
import { Button, Pagination } from '../../../components';
import { setModalAddEntity } from "../../../redux/actions";
import { useDispatch } from 'react-redux'

function RulesHeader() {
    const dispatch = useDispatch();

    return (
        <div className="rules__header">
            <div className="rules__pagination">
                <Pagination />
            </div>
            <Button onClick={()=>{dispatch(setModalAddEntity(true))}} type='outlined' size="big" text="ADD ENTITY" />
        </div>
    )
}

export default React.memo(RulesHeader)