import React from 'react';
import { Route } from 'react-router-dom';

import DashboardPage from './DashboardPage/DashboardPage';

export default (
    <Route exact path="/" component={DashboardPage} />
);
