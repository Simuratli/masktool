import React, { useEffect, useState } from "react";
import { ProgressBarPropTypes, FillerStylesTypes } from './ProgressLoader.types'


const ProgressBar = ({ bgcolor, completed }: ProgressBarPropTypes) => {
    

  

    const containerStyles = {
        height: 8,
        width: 650,
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        display:"block"
    }

    const fillerStyles: FillerStylesTypes = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        transition: 'width 0.1s ease-in-out',
        borderRadius: 'inherit',
    }


    return (
        <div className="progressLoader" style={containerStyles}>
            <div style={fillerStyles}>
            </div>
        </div>
    );
};

export default ProgressBar;