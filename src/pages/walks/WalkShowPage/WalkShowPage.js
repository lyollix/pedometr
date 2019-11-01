import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchWalk } from '../../../actions/WalkActions';
import { Loading } from '../../../helpers';
import { WalkInfo } from '../../../components/walks';
import {NavLink} from "react-router-dom";
import IconHome from '@/assets/images/home.svg';

class WalkShowPage extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                walkId: PropTypes.string.isRequired
            }).isRequired
        }).isRequired,
        item: PropTypes.shape({
            id: PropTypes.number
        }).isRequired,
        itemLoading: PropTypes.bool.isRequired,
        itemFetched: PropTypes.bool.isRequired,
        itemErrorMessage: PropTypes.string,
        fetchWalk: PropTypes.func.isRequired
    };

    static defaultProps = {
        itemErrorMessage: null
    };

    componentDidMount() {
        const { match: { params: { walkId } } } = this.props;
        this.props.fetchWalk(walkId);
    };

    render() {
        const {
            match: { params: { walkId } },
            item, itemLoading, itemFetched, itemErrorMessage
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
                        {walkId}
                    </li>
                    <li className="breadcrumb-item active">Просмотр</li>
                </ul>

                <h1>Просмотр прогулки</h1>

                {itemErrorMessage ? (
                    <div>{itemErrorMessage}</div>
                ) : null}

                <div className="card mt-2">
                    <Loading loaded={itemFetched}>
                        <WalkInfo item={item} />
                    </Loading>
                </div>
            </div>
        )
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
    fetchWalk
})(WalkShowPage);
