import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import { NavLink } from 'react-router-dom';
import {
    fetchWalk as fetchWalkAction,
    updateWalk as updateWalkAction
} from '@/actions/WalkActions';
import { WalkForm } from '@/components';
import { Loading } from '@/helpers';
import IconHome from '@/assets/images/home.svg';

class WalkEditPage extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                walkId: PropTypes.string
            }).isRequired
        }).isRequired,
        item: PropTypes.shape({
            id: PropTypes.number
        }).isRequired,
        itemLoading: PropTypes.bool.isRequired,
        itemFetched: PropTypes.bool.isRequired,
        itemErrorMessage: PropTypes.string,
        fetchWalk: PropTypes.func.isRequired,
        updateWalk: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired
    };

    static defaultProps = {
        itemErrorMessage: null
    };

    componentDidMount() {
        const { match: { params: { walkId } } } = this.props;
        this.props.fetchWalk(walkId);
    }

    render() {
        const {
            match: { params: { walkId } },
            item, itemLoading, itemFetched, itemErrorMessage, updateWalk, push
        } = this.props;

        return (
            <div className="page">
                <ul className="breadcrumbs">
                    <li className="breadcrumb-item">
                        <NavLink to="/">
                            <IconHome width={17} height={17}/>
                        </NavLink>
                    </li>
                    <li className="breadcrumb-item">
                        <NavLink to="/walks">Прогулки</NavLink>
                    </li>
                    <li className="breadcrumb-item">
                        <NavLink to={`/walks/${walkId}/show`}>{walkId}</NavLink>
                    </li>
                    <li className="breadcrumb-item active">Правка</li>
                </ul>

                <h1>Изменить прогулку</h1>

                {itemErrorMessage ? (
                    <div>{itemErrorMessage}</div>
                ) : null}

                <div className="card mt-2">
                    <Loading loaded={itemFetched}>
                        <WalkForm
                            walkId={walkId}
                            item={item}
                            onSubmit={values => updateWalk(walkId, values)
                                .then(() => push('/walks'))}
                        />
                    </Loading>
                </div>
            </div>
        );
    }
}

export default connect(({
walks: {
    item,
    itemLoading,
    itemFetched,
    itemErrorMessage
}
}) => ({
    item,
    itemLoading,
    itemFetched,
    itemErrorMessage
}), {
    fetchWalk: fetchWalkAction,
    updateWalk: updateWalkAction,
    push: pushAction
})(WalkEditPage);
