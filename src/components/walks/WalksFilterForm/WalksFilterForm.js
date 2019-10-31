import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { WALKS_FILTER_FORM } from '../../../constants/Form';

import {Button, renderField} from '../../../helpers';

function WalksFilterForm({
    walks, isLoading, onReset, onSearch
}) {
    return (
        <form>
            <Field
                disabled={isLoading}
                name="id"
                label="ID"
                component={renderField}
            />
            <Button onClick={() => onSearch()}>Search</Button>
            <Button onClick={() => onReset()}>Reset</Button>
        </form>
    );
}

WalksFilterForm.propTypes = {
    walks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number
    })).isRequired,
    isLoading: PropTypes.bool.isRequired,
    onReset: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
};

export default reduxForm({ form: WALKS_FILTER_FORM })(WalksFilterForm);
