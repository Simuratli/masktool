import React from 'react';
import { HeaderPropTypes } from './header.types';

function Header({ headerType, text }: HeaderPropTypes) {
    return (
        <div className={`header ${headerType}`}>{text}</div>
    )
}

export default React.memo(Header);