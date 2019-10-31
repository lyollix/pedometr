import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

function renderField({
     className, inputClassName, number,
     input, type, label, placeholder, prefix, addon, tooltip, required, disabled, hidden,
     meta: { touched, error, warning },
     afterChange
 }) {
    const inputView = (
        <input
            id={`form-input-${input.name}`}
            className={cl(`${inputClassName} form-control`, {
                'has-feedback': touched && error,
                'form-control-success': touched && !error && !warning,
                'form-control-danger': touched && error,
                'form-control-warning': touched && warning
            })}
            {...input}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            hidden={hidden}
            onChange={({ target: { value } }) => {
                if (number) {
                    value = value
                        .replace(/[^,.\d]+/g, '')
                        .replace(/,/, '.')
                        .replace(/^([^.]*\.)|\./g, '$1');
                }
                input.onChange(value === '' ? null : value);
                if (afterChange) {
                    afterChange(value === '' ? null : value);
                }
            }}
        />
    );

    return (
        <div
            className={cl(className || 'form-group', {
                'has-success': touched && !error && !warning,
                'has-danger': touched && error,
                'has-warning': touched && warning
            })}
        >
            {label ? (
                <label className="form-control-label" htmlFor={`form-input-${input.name}`}>
                    {label} {tooltip}
                </label>
            ) : null}
            {prefix || addon ? (
                <div className="input-group">
                    {prefix ? <div className="input-group-addon">{prefix}</div> : null}
                    {inputView}
                    <span className="bar" />
                    {addon ? <div className="input-group-addon">{addon}</div> : null}
                </div>
            ) : inputView}
            {touched && error && <div className="form-control-feedback">{error}</div>}
            {touched && warning && <div className="form-control-feedback">{warning}</div>}
        </div>
    );
}

renderField.propTypes = {
    className: PropTypes.string,
    inputClassName: PropTypes.string,
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
    type: PropTypes.string,
    placeholder: PropTypes.string,
    prefix: PropTypes.string,
    addon: PropTypes.string,
    tooltip: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    hidden: PropTypes.bool,
    afterChange: PropTypes.func,
    number: PropTypes.bool
};

renderField.defaultProps = {
    className: null,
    inputClassName: null,
    label: null,
    type: 'text',
    placeholder: null,
    prefix: null,
    addon: null,
    tooltip: null,
    required: null,
    disabled: null,
    hidden: null,
    afterChange: null,
    number: false,
    value: undefined
};

export default renderField;
