import React from 'react'
import { Button, Pagination } from '../../../components';

function RulesHeader() {
    return (
        <div className="rules__header">
            <div className="rules__pagination">
                <Pagination />
            </div>
            <Button type='outlined' size="big" text="ADD ENTITY" />
        </div>
    )
}

export default React.memo(RulesHeader)