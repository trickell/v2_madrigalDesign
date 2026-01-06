import React from 'react';

const PushableButton = ({ children, onClick, className = '', style = {}, frontStyle = {} }) => {
    return (
        <button className={`pushable ${className}`} onClick={onClick} style={style}>
            <span className="pushable-shadow"></span>
            <span className="pushable-edge"></span>
            <span className="pushable-front" style={frontStyle}>
                {children}
            </span>
        </button>
    );
};

export default PushableButton;
