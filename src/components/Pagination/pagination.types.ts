import React from 'react';

export interface PageStateTypes {
    rangeView: number;
    pageCount: number;
}

export interface NextPrevButtonPropTypes {
    setPage: React.Dispatch<React.SetStateAction<PageStateTypes>>;
    type: string;
    disabled:boolean;
}
