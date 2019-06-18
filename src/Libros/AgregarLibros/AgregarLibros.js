import React from "react";
import { Formik } from "formik";
import "./AgregarLibros.css";

class AgregarLibros extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    this.props.onAdd(values);
  };

  validate = values => {
    let errors = {};
    if (!values.name) {
      errors.name = "El nombre del libro es requerido";
    }
    if (!values.author) {
      errors.author = "Se requiere un autor";
    }
    if (!values.genre) {
      errors.genre = "Se requirere un genero";
    }
    // if (!values.codigo) {
    //   errors.codigo = "Se requiere un codigo";
    // }
    return errors;
  };

  render() {
    return (
      <div class="center">
        <h3>Agregar Libro</h3>
        <Formik
          initialValues={{ name: "", author: "", genre: ""}}
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
                  <span class="form-row-span">Nombre:</span>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                  />
                  {errors.name && touched.name && errors.name}
                </div>
                <div class="form-row">
                  <span class="form-row-span">Autor:</span>
                  <input
                    type="text"
                    name="author"
                    onChange={handleChange}
                    value={values.author}
                  />
                  {errors.author && touched.author && errors.author}
                </div>
                <div class="form-row">
                  <span class="form-row-span">Genero:</span>
                  <input
                    type="text"
                    name="genre"
                    onChange={handleChange}
                    value={values.editorial}
                  />
                  {errors.genre && touched.genre && errors.genre}
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

// AgregarLibros.defaultProps = {
//   libros: [
//     {
//       nombre: "The Wandering Earth",
//       autor: "Liu Cixin",
//       editorial: "Beijing Qingse Media Co",
//       codigo: "B00CXUKNA2"
//     },
//     {
//       nombre: "It",
//       autor: "Stephen King",
//       editorial: "Scribner",
//       codigo: "B018ER7K5I"
//     },
//     {
//       nombre: "A Game of Thrones",
//       autor: "George R. R. Martin",
//       editorial: "Bantam Books",
//       codigo: "0553103547"
//     },
//     {
//       nombre: "Tyranny of Secrets",
//       autor: "John Statton",
//       editorial: "Amazon Digital Services LLC",
//       codigo: "B07497KVHR"
//     },
//     {
//       nombre: "Elysia",
//       autor: "C.C. Francis ",
//       editorial: "Amazon Digital Services LLC",
//       codigo: "B07P3T9PY8"
//     }
//   ]
// };

export default AgregarLibros;
