import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import { NavLink } from 'react-router-dom';

import { createWalk as createWalkAction } from '@/actions/WalkActions';
import { WalkForm } from '@/components';
import { Loading } from '@/helpers';
import IconHome from '@/assets/images/home.svg';

function WalkAddPage({ itemErrorMessage, createWalk, push }) {
    return (
        <div className="page">

            <div className="breadcrumbs">
                <li className="breadcrumb-item">
                    <NavLink to="/">
                        <IconHome width={17} height={17}/>
                    </NavLink>
                </li>
                <li className="breadcrumb-item">
                    <NavLink to="/walks">Прогулки</NavLink>
                </li>
                <li className="breadcrumb-item active">Новая</li>
            </div>

            <h1>Создать прогулку</h1>

            {itemErrorMessage ? (
                <div>{itemErrorMessage}</div>
            ) : null}

            <div className="card mt-2">
                <Loading loaded>
                    <WalkForm
                        onSubmit={values => createWalk(values)
                            .then(() => push('/'))}
                    />
                </Loading>
            </div>
        </div>
    );
}

WalkAddPage.propTypes = {
    itemErrorMessage: PropTypes.string,
    createWalk: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
};

WalkAddPage.defaultProps = {
    itemErrorMessage: null
};

export default connect(({
walks: {
    itemErrorMessage
}}) => ({
    itemErrorMessage
}), {
    createWalk: createWalkAction,
    push: pushAction
})(WalkAddPage);
