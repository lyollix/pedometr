import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import isNumber from 'lodash/isNumber';

function renderTextareaField({
 input, label, placeholder, max, cols, rows, helpBlock, disabled,
 afterChange, meta: { touched, error, warning }
}) {
    return (
        <div
            className={cl('form-group', {
                'has-success': touched && !error && !warning,
                'has-danger': touched && error,
                'has-warning': touched && warning
            })}
        >
            {label ? <label htmlFor={`form-input-${input.name}`}>{label}</label> : null}
            <textarea
                id={`form-input-${input.name}`}
                className="form-control"
                {...input}
                onChange={e => {
                    const value = isNumber(max) ? e.target.value.slice(0, max) : e.target.value;
                    input.onChange(value);

                    if (afterChange) {
                        afterChange(value);
                    }
                }}
                placeholder={placeholder}
                cols={cols}
                rows={rows}
                disabled={disabled}
            />
            {max ? (
                <div className="help-block">
                    {input.value ? input.value.length : 0} of {max}{helpBlock ? helpBlock(input.value) : null}
                </div>
            ) : null}
            {touched && error && <div className="form-control-feedback">{error}</div>}
            {touched && warning && <div className="form-control-feedback">{warning}</div>}
        </div>
    );
}

renderTextareaField.propTypes = {
    input: PropTypes.shape({
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    }).isRequired,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string,
        warning: PropTypes.string
    }).isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    max: PropTypes.number,
    cols: PropTypes.number,
    rows: PropTypes.number,
    helpBlock: PropTypes.func,
    afterChange: PropTypes.func,
    disabled: PropTypes.bool
};

renderTextareaField.defaultProps = {
    label: null,
    placeholder: null,
    max: null,
    cols: null,
    rows: null,
    helpBlock: null,
    afterChange: null,
    disabled: null
};

export default renderTextareaField;
