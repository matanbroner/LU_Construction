import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route} from 'react-router-dom'
import ReactGA from 'react-ga';
import HomePage from './containers/HomePage/HomePage';
import SignInPage from './containers/SignInPage/SignInPage';
import TestimonialsPage from './containers/TestimonialsPage/TestimonialsPage'
import ProjectsPage from './containers/ProjectsPage/ProjectsPage'
import UserDashboard from './containers/UserDashboard/UserDashboard'
import ContactPage from './containers/ContactPage/ContactPage'
import AboutPage from './containers/AboutPage/AboutPage'
import PageNotFound from './components/PageNotFound/PageNotFound'
import NavigationBar from './components/NavigationBar/NavigationBar'
import BottomBar from './components/BottomBar/BottomBar'
import * as serviceWorker from './serviceWorker';
import defaultStyling from './index.css'
import { createBrowserHistory as createHistory } from 'history'

const history = createHistory()
ReactGA.initialize('UA-00000000-1');
history.listen((location, action) => {
    ReactGA.pageview(location.pathname + location.search);
});

ReactDOM.render((
    <Router history={history}>
        <NavigationBar/>
        <Route exact path="/" component={HomePage}/>
        <Route path="/sign_in" component={SignInPage}/>
        <Route path="/testimonials" component={TestimonialsPage}/>
        <Route path="/about" component={AboutPage}/>
        <Route path="/contact" component={ContactPage}/>
        <Route path="/projects" component={ProjectsPage}/>
        <Route path="/user_dash" component={UserDashboard}/>
        <BottomBar/>
    </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
