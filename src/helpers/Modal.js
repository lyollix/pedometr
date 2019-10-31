import React from 'react';
import PropTypes from 'prop-types';

function Modal({
   children
}) {
    return (
        <div className="modal-mask">
            <div className="modal-container">
                <div className="modal-inner">
                    {children}
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    children: PropTypes.node,
};

Modal.defaultProps = {
    children: null
};

export default Modal;
