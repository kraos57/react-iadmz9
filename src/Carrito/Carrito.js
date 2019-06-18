import React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logIn, logOut } from "../reducers/auth";

import { Formik } from "formik";
import { history } from "../Store";
import NavBar from "../NavBar/NavBar";


class Carrito extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
        <h1>Carrito de compras</h1>
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
)(Carrito);
