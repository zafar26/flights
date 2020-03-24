import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Search'
import Data from './data'
// import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store'

export default class App extends React.Component {
  
  render(){
  return (
        <Provider store={store}>
          <Router >
            <Switch>
              <Route exact path="/" component={Search} />
              <Route path="/flights" component={Data} />
            </Switch>
        </Router>
    </Provider>)
  }
}

// export default App;
