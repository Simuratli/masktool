import React from "react";

const ProgressBar = ({ bgcolor, completed }:any) => {

    const containerStyles = {
        height: 8,
        width: 838,
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: "0 auto",
    }

    const fillerStyles:any = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        transition: 'width 1s ease-in-out',
        borderRadius: 'inherit',
        textAlign: 'right',
    }


    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
            </div>
        </div>
    );
};

export default ProgressBar;