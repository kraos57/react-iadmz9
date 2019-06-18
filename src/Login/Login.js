import React from "react";
import Axios from 'axios';
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { 
  logInSuccess,
  logInError,
  logOut
   } from "../reducers/auth";

import { Formik } from "formik";
import { history } from "../Store";

import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit2 = (values, { setSubmitting }) => {
    setSubmitting(false);
    this.props.logInSuccess(values);
    setTimeout(() => {
      history.push("/libros");
    }, 3000);
  };


  onSubmit = (values, {setSubmitting}) => {
      //alert(JSON.stringify(values))
      setSubmitting(false);
      let userMap = {
        email: values.correo,
        password: values.clave
      }
      console.log("Login Page - Axios Login");
      Axios.post('http://kyrapps.com:4300/api/login', {user:userMap}).then((res)=>{
        if(res.data.token){
          this.props.logInSuccess(res.data.user);
          console.log("Login Page - Axios Login Correct");
          history.push('/libros');
        }
        else{
          console.log("Login Page - Axios Login Incorrect");
          this.props.logInError();  
        }
      });
    }
  

  validate = values => {
    let errors = {};
    if (!values.correo) {
      errors.correo = "El correo es requerido";
    }
    if (!values.clave) {
      errors.clave = "La clave es requerida";
    }
    return errors;
  };

  componentDidMount() {
    console.log("Login Page - Loaded");
  }

  render() {
    return (
      <div class="login-container-parent">
        <h2>Login</h2>
        <div class="login-container">
          <Formik
            initialValues={{ correo: "", clave: "" }}
            validate={this.validate}
            onSubmit={this.onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting
            }) => (
              <form onSubmit={handleSubmit} validate="false">
                <div class="login-row">
                  <input
                    type="text"
                    name="correo"
                    onChange={handleChange}
                    value={values.correo}
                  />
                  {errors.correo && touched.correo && errors.correo}
                </div>
                <div class="login-row">
                  <input
                    type="text"
                    name="clave"
                    onChange={handleChange}
                    value={values.clave}
                  />
                  {errors.clave && touched.clave && errors.clave}
                </div>
                <div class="login-row">
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </div>
              </form>
            )}
          </Formik>
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
      logInSuccess
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
