import React, { Component } from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logIn, logOut } from "./reducers/auth";

import Login from "./Login/Login";
import Libros from "./Libros/Libros";
import Usuarios from "./Usuarios/Usuarios";
import Carrito from "./Carrito/Carrito";

import "./App.css";
import { history } from "./Store";

import { Switch, Route, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.isLogged === true ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/login" />} />
                <PrivateRoute path="/libros" component={Libros} />
                <PrivateRoute path="/usuarios" component={Usuarios} />
                <PrivateRoute path="/carrito" component={Carrito} />
                <Route path="/login" component={Login} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLogged: state.auth.isLogged,
    loggedUser: state.auth.loggedUser,
    logginError: state.auth.logginError
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logIn
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
