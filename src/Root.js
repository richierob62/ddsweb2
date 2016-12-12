/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
/*eslint-enable no-unused-vars*/


const Root = (props) => {

    const { store, history, routes } = props;

    return (
        <Provider store={store}>
            <div>
                <Router history={history} routes={routes} />
            </div>
        </Provider>
    );

}

export default Root;
