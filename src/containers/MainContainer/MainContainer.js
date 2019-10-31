import React, { Component } from 'react';
import { main, walks } from '../../pages/routes';
import { Header } from "../../components";
import ReduxToastr from 'react-redux-toastr';

export default class MainContainer extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    {main}
                    {walks}
                </div>
                <ReduxToastr
                    progressBar
                    timeOut={4000}
                    preventDuplicates
                    position="top-right"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                />
            </div>
        )
    }
}
