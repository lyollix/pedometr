import React from 'react';
import { Route } from 'react-router-dom';

import WalksIndexPage from './WalksIndexPage/WalksIndexPage';
import WalkShowPage from './WalkShowPage/WalkShowPage';
import WalkAddPage from './WalkAddPage/WalkAddPage';
import WalkEditPage from './WalkEditPage/WalkEditPage';

export default [
    <Route
        exact
        key="walks-index"
        path="/walks"
        component={WalksIndexPage}
    />,
    <Route
        exact
        key="walks-show"
        path="/walks/:walkId/show"
        component={WalkShowPage}
    />,
    <Route
        exact
        key="walks-add"
        path="/walks/new"
        component={WalkAddPage}
    />,
    <Route
        exact
        key="walks-edit"
        path="/walks/:walkId/edit"
        component={WalkEditPage}
    />
];
