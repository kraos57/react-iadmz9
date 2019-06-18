import React from 'react';
import {Formik} from 'formik'


class AgregarUsuarios extends React.Component{
  
  constructor(props){
  	super(props);
  }

  onSubmit = (values, {setSubmitting}) => {
    setSubmitting(false);
    this.props.onAdd(values);
  }

  validate = (values) => {
    let errors = {};
    if(!values.nombre){
      errors.nombre = 'El nombre es requerido';
    }
    if(!values.correo){
      errors.correo = 'El correo es requerido';
    }
    if(!values.clave){
      errors.clave = 'La clave es requerida';
    }
    return errors; 
  }

  render(){
    
    return (
        <div class="center">
        <h3>Agregar Usuario</h3>
          <Formik
            initialValues={{ nombre: '', correo: '', clave: ''}}
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
            <div class="center-div">
              <form onSubmit={handleSubmit} validate="false">
                <div class="form-row">
                  <input
                    type="text"
                    name="nombre"
                    onChange={handleChange}
                    value={values.nombre}
                  />
                  {errors.nombre && touched.nombre && errors.nombre}
                 </div>
                <div class="form-row">
                  <input
                    type="text"
                    name="correo"
                    onChange={handleChange}
                    value={values.rating}
                  />
                  {errors.correo && touched.correo && errors.correo}
                </div>
                <div class="form-row">
                  <input
                    type="text"
                    name="clave"
                    onChange={handleChange}
                    value={values.genero}
                  />
                  {errors.clave && touched.clave && errors.clave}
                </div>
                <div class="form-row">
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </div>
              </form>
              </div>
            )}
          </Formik>
        </div>
    );
  }
}

// AgregarUsuarios.defaultProps = {
// 	usuarios : [
//         {
//           nombre: 'Luis Ramirez',
//           correo: 'luisr@mail.com',
//           clave: '123queso'
//         },
//         {
//           nombre: 'Natalia Chavarria',
//           correo: 'nataliac@mail.com',
//           clave: '123quesostop'
//         },
//         {
//           nombre: 'John Salchichon',
//           correo: 'johns@mail.com',
//           clave: '123quesostop'
//         }

//       ]
// }

export default AgregarUsuarios;