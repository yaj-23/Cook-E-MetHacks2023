import React from 'react';
import './button.css';

const STYLES = ['btn-primary', 'btn-secondary']
const SIZES = ['btn-medium']
const COLOR = ['dark', 'light']

export const Button = ( {
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    buttonColor
} ) => {
 
    const checkButtonStyle =STYLES.includes = {buttonStyle} ? buttonStyle : STYLES[0]
    const checkButtonSize =SIZES.includes = {buttonSize} ? buttonSize : SIZES[0]
    const checkButtonColor =COLOR.includes = {buttonColor} ? buttonColor : COLOR[0]

    return(
        <button className={`btn ${checkButtonStyle} 
        ${checkButtonSize} 
        ${checkButtonColor}`} onClick={onClick} type={type}>
        
            {children}
        </button>
    )
}