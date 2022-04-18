import React from 'react';

export interface PageStateTypes {
    range: number;
    rangeView: number;
    current: number;
    pageCount: number;
}

export interface NextPrevButtonPropTypes {
    setPage: React.Dispatch<React.SetStateAction<PageStateTypes>>;
    type: string;
    disabled:boolean;
}
