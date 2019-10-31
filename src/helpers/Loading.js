import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loaders';
import cl from 'classnames';

function Loading({
    className, loaded, ignoreLoader, type, children
}) {
    return (
        <div className={cl('loader-wrapper', className)}>
            {ignoreLoader}
            {loaded ? children : <Loader color="#1ab1e3" type={type} />}
        </div>
    );
}

Loading.propTypes = {
    className: PropTypes.string,
    loaded: PropTypes.bool.isRequired,
    children: PropTypes.node,
    type: PropTypes.string,
    ignoreLoader: PropTypes.node
};

Loading.defaultProps = {
    className: null,
    children: null,
    type: 'ball-pulse',
    ignoreLoader: null
};

export default Loading;
