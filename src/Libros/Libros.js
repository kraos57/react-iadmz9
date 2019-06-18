import React from "react";
import Axios from 'axios';

import AgregarLibros from "./AgregarLibros/AgregarLibros";
import NavBar from "../NavBar/NavBar";
import "./Libros.css";

class Libros extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      libros : [] //this.props.libros
    }
  }

  // agregarLibro = user => {
  //   this.setState({
  //     libros: [...this.state.libros, user]
  //   });
  // };

  agregarLibro = (book) => {
    let libro = {
       "name":book.name,
       "author":book.author,
       "genre":book.genre,
       "studentID":3
    }
    Axios.post('http://kyrapps.com:4300/api/books?studentID=3', {book:libro}).then((res)=>{
        this.actualizarListaLibros();
        console.log("Listar Libros - Se actualizaron los Libros, luego de 'Agregar'");
       });
  }

  editarLibro = (bookId, libro) => {
    Axios.put('http://kyrapps.com:4300/api/books/'+bookId+'?studentID=3', {book:libro}).then((res)=>{
        this.actualizarListaLibros();
        console.log("Listar Usuarios - Se actualizaron los Libros, luego de 'Editar'");
       });
  }

  eliminarLibro = (bookId) => {
    Axios.delete('http://kyrapps.com:4300/api/books/'+bookId+'?studentID=3').then((res)=>{
        this.actualizarListaLibros();
        console.log("Listar Usuarios - Se actualizaron los Libros, luego de 'Eliminar'");
       });
  }

  actualizarListaLibros = () =>{
       Axios.get('http://kyrapps.com:4300/api/books?studentID=3').then((res)=> {
           let books = res.data.book.map((book)=>{
               return{
                   name: book.name,
                   author: book.author,
                   genre: book.genre,
                   id : book._id
               }
           })
           this.setState({
            libros: books
           })
       });
  }

  componentDidMount(){
    console.log("Listar Libros - Se cargo correctamente");
    this.actualizarListaLibros();
    console.log("Listar Libros - Se actualizaron los Libros");

    // Constructor
    // Render
    // DidMount
    // Destroy
  }

  render() {
    var lista_libros = this.state.libros.map((libro, index) => {
      return (
        <tr key={index}>
          <td align="left">{libro.name}</td>
          <td align="left">{libro.author}</td>
          <td align="left">{libro.genre}</td>
          <td align="left">
            <button onClick={() => (this.editarLibro(libro.id, libro))}>Edit</button>
          </td>
          <td align="left">
            <button onClick={() => (this.eliminarLibro(libro.id, libro))}>Remove</button>
          </td>
        </tr>
      );
    });

    return (
      <div class="center">
        <NavBar />
        <h2>Libros:</h2>
        <div class="center-table">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Autor</th>
                <th>Genero</th>
                <th/>
                <th/>
              </tr>
            </thead>
            <tbody>
              {lista_libros}
            </tbody>
            <caption align="bottom">Alejandria - Lista de Libros (2019)</caption>
          </table>
        </div>
        <AgregarLibros onAdd={this.agregarLibro}>
          Agregar Usuarios
        </AgregarLibros>
      </div>
    );
  }
}

// Libros.defaultProps = {
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

export default Libros;
