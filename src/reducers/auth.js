import history from "../Store";

const initialState = {
  isLogged: false,
  logginError: "",
  loggedUser: {}
};

export default (state = initialState, action) => {
  
  switch (action.type) {
    
    case "login":
      return {
        ...state,
        isLogged: true,
        loggedUser: action.user,
        logginError: ""
      };
    case "logInError":
      return {
        ...state,
        logginError: action.error
      };
    case "logOut":
      return {
        ...state,
        isLogged: false,
        loggedUser: {}
      };
    default:
      return state;
  }
};

export const logOut = () => {
  return dispatch => {
    dispatch({
      type: "logOut"
    });
  };
};

export const logIn = val => {
  return dispatch => {
    return setTimeout(() => {
      if (val.correo === "luis@mail.com" && val.clave === "123") {
        val.nombre = "Luis";
        dispatch({
          type: "login",
          user: val
        });
      } else {
        dispatch({
          type: "logInError",
          error: "Hay un problema en su info"
        });
      }
    }, 1000);
  };
};

export const logInError = () => {
  return dispatch => {
    dispatch({
      type: 'logInError',
      error: 'Hay un problema en su info'
    })

    //logInError
    console.log('Auth - logInError');

  }
}

export const logInSuccess = (val) => {
  return dispatch => {
    localStorage.setItem('isLogged',true);
    localStorage.setItem('val',JSON.stringify(val));
    dispatch({
      type: 'login',
      user: val      
    })
    //logInSuccess
    console.log('Auth - logInSuccess');
  }
}
