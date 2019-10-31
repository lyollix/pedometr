import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

function Button({
        className, addClass,
        color, size, outline, rounded, icon, afterIcon, disabled, ref,
        submit, onClick, children, style
    }) {
    const buttonClass = className || cl('btn', color ? `btn-${color}` : null, {
        [`btn-${size}`]: !!size,
        [addClass]: !!addClass,
        'btn-outline': outline,
        'btn-rounded': rounded
    });

    const buttonIcon = icon ? <i className={cl('fa', `fa-${icon}`)} /> : null;
    const buttonAfterIcon = afterIcon ? <i className={cl('fa', `fa-${afterIcon}`)} /> : null;

    return (
        <button
            type={submit ? 'submit' : 'button'}
            className={buttonClass}
            style={style}
            disabled={disabled}
            ref={ref}
            onClick={e => {
                if (!submit) {
                    e.preventDefault();
                }
                if (onClick) {
                    onClick(e);
                }
            }}
        >
            {buttonIcon}
            {buttonIcon && children ? ' ' : null}
            {children}
            {buttonAfterIcon && children ? ' ' : null}
            {buttonAfterIcon}
        </button>
    );
}

Button.propTypes = {
    className: PropTypes.string,
    addClass: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    icon: PropTypes.string,
    afterIcon: PropTypes.string,
    submit: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    ref: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object
};

Button.defaultProps = {
    className: null,
    addClass: null,
    color: null,
    size: null,
    outline: null,
    rounded: null,
    icon: null,
    afterIcon: null,
    submit: null,
    disabled: null,
    children: null,
    ref: null,
    onClick: null,
    style: {}
};

export default Button;
