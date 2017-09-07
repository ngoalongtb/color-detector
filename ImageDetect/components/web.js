import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { Router, Route, hashHistory } from 'react-router';

import Layout from './layout/Layout';

import Home from './pages/Home';
import ColorDetect from './pages/ColorDetect';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

render(
    <MuiThemeProvider>
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                <Route path="/home" component={Home}/>
                <Route path="/color-detect" component={ColorDetect}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/admin" component={Admin}/>
            </Route>
        </Router>
    </MuiThemeProvider>
    ,
    document.getElementById('root')
);