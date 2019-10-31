import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import cl from 'classnames';

class renderDatePicker extends Component {
    static propTypes = {
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
        disabled: PropTypes.bool
    };

    static defaultProps = {
        label: null,
        disabled: false
    };

    state = {
        date: new Date()
    };

    onChange = date => {
        this.setState({ date });
        this.props.input.onChange(date);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.input.value !== this.props.input.value) {
            this.setState({date: this.props.input.value ? moment(this.props.input.value).toDate() : new Date()})
        }
    }

    componentDidMount() {
        if (!this.props.input.value) this.props.input.onChange(this.state.date);
    }

    render() {
        const {
            input, label, disabled,
            meta: { touched, warning, error }
        } = this.props;

        return (
            <div className={cl('form-group', { 'has-error': (touched && error) })}>
                {label ? <label htmlFor={`form-input-${input.name}`}>{label}</label> : null}
                <DateTimePicker
                    id={`form-input-${input.name}`}
                    className="form-control inline"
                    onChange={this.onChange}
                    disabled={disabled}
                    onToggle={() => {}}
                    value={this.state.date}
                    clearIcon={null}
                />
                {touched && error && <div className="form-control-feedback">{error}</div>}
                {touched && warning && <div className="form-control-feedback">{warning}</div>}
            </div>
        );
    }
}

export default renderDatePicker;
