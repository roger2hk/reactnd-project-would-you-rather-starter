import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

import Nav from "./Nav";
import Login from "./Login";
import Logout from "./Logout";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import { handleInitialData } from "../actions/shared";
import Question from "./Question";
import NewQuestion from "./NewQuestion";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;

    return (
      <Router>
        {authedUser ? (
          <Fragment>
            <Nav />
            <Route path="/" exact component={Dashboard} />
            <Route path="/questions/:id" component={Question} />
            <Route path="/add" component={NewQuestion} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/logout" component={Logout} />
          </Fragment>
        ) : (
          <Fragment>
            <Redirect to={"/login?return-url=" + window.location.pathname} />
            <Route path="/login" component={Login} />
          </Fragment>
        )}
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(App);
