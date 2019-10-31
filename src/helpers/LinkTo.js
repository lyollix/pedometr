import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import { Link } from 'react-router-dom';

function LinkTo({
        toObj,
        className,
        addClass,
        url, href,
        button,
        color, size, icon, buttonFix, xsButtonFix, buttonTopFix, outline, rounded,
        active,
        pureLink,
        target,
        onClick,
        children,
        style
    }) {
    const linkUrl = url || href;

    const buttonClass = className || cl({
        btn: button,
        [`btn-${color}`]: !!color,
        [`btn-${size}`]: !!size,
        [addClass]: !!addClass,
        'btn-outline': outline,
        'btn-rounded': rounded,
        active
    });

    const linkIcon = icon ? <i className={cl('fa', `fa-${icon}`)} /> : null;

    if (pureLink) {
        return (
            <a
                className={cl(buttonClass)}
                href={linkUrl}
                target={target}
                onClick={e => {
                    if (onClick) {
                        e.preventDefault();
                        onClick(e);
                    }
                }}
            >
                {linkIcon}
                {linkIcon && children ? ' ' : null}
                {children}
            </a>
        );
    }
    return (
        <Link className={cl(buttonClass)} to={toObj || `/${linkUrl}`} style={style}>
            {linkIcon}
            {linkIcon && children ? ' ' : null}
            {children}
        </Link>
    );
}

LinkTo.propTypes = {
    toObj: PropTypes.object,
    className: PropTypes.string,
    addClass: PropTypes.string,
    url: PropTypes.string,
    href: PropTypes.string,
    button: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    active: PropTypes.bool,
    pureLink: PropTypes.bool,
    target: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
    style: PropTypes.object
};

LinkTo.defaultProps = {
    toObj: null,
    state: {},
    className: null,
    addClass: null,
    url: null,
    href: null,
    button: null,
    color: null,
    size: null,
    icon: null,
    outline: null,
    rounded: null,
    active: null,
    pureLink: null,
    target: null,
    children: null,
    onClick: null,
    style: {}
};

export default LinkTo;
