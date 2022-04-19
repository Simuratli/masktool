import React from 'react';
import { DotPropTypes } from './dot.types';

function Dot({ type }: DotPropTypes) {
    return (
        <span className={`dot ${type}`}></span>
    )
}

export default React.memo(Dot)