import React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logIn, logOut } from "../reducers/auth";

import { Formik } from "formik";
import { history } from "../Store";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  onLogout = ({ setSubmitting }) => {
    //alert(JSON.stringify(values))
    setSubmitting(false);
    this.props.logOut();
    setTimeout(() => {
      history.push("/");
    }, 3000);
  };

  render() {
    return (
      <div className="NavBar">
        <nav>
          <a href="#/libros"> Libros </a>|
          <a href="#/usuarios"> Usuarios </a>|
          <a href="#/carrito"> Carrito de Compras </a>|
          <a href="#" onclick="onLogout()">
            {" "}
            Logout{" "}
          </a>
        </nav>
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
)(NavBar);
