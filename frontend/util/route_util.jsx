import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';

const Auth = ({
  component: Component, path, loggedIn, exact,
}) => (
  <Route
    path={path}
    exact={exact}
    render={props => (
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/home" />
      )
    )}
  />
);

const mapStateToProps = state => ({ loggedIn: Boolean(state.session.currentUser.id) });

const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));

export default AuthRoute;
