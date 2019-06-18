import React from 'react';
import Axios from 'axios';

import AgregarUsuarios from './AgregarUsuarios/AgregarUsuarios';
import NavBar from "../NavBar/NavBar";
import "./Usuarios.css";


class Usuarios extends React.Component{
  
  constructor(props){
  	super(props);
  	this.state = {
  		usuarios : [],//this.props.usuarios
      usuarioEditar : []
  	}
  }

  // Delete
  // http://kyrapps.com:4300/api/users/{userId}?studentID=3

  // Update
  // http://kyrapps.com:4300/api/users/{userId}?studentID=3

  // Adds user into State
  // agregarUsuario = (user) => {
  //   this.setState({
  //     usuarios : [...this.state.usuarios, user]
  // })}
  

  agregarUsuario = (user) => {
    let usuario = {
       "name":user.nombre,
       "email":user.correo,
       "password":user.clave,
       "studentID":3
    }
    Axios.post('http://kyrapps.com:4300/api/users?studentID=3', {user:usuario}).then((res)=>{
        this.actualizarListaUsuarios();
        console.log("Listar Usuarios - Se actualizaron los Usuarios, luego de 'Agregar'");
       });
  }

  editarUsuario = (userId, usuario) => {
    Axios.put('http://kyrapps.com:4300/api/users/'+userId+'?studentID=3', {user:usuario}).then((res)=>{
        this.actualizarListaUsuarios();
        console.log("Listar Usuarios - Se actualizaron los Usuarios, luego de 'Editar'");
       });
  }

  eliminarUsuario = (userId) => {
    Axios.delete('http://kyrapps.com:4300/api/users/'+userId+'?studentID=3').then((res)=>{
        this.actualizarListaUsuarios();
        console.log("Listar Usuarios - Se actualizaron los Usuarios, luego de 'Eliminar'");
       });
  }

  actualizarListaUsuarios = () =>{
       Axios.get('http://kyrapps.com:4300/api/users?studentID=3').then((res)=> {
           let users = res.data.user.map((user)=>{
               return{
                   nombre: user.name,
                   correo: user.email,
                   clave: user.password,
                   id : user._id
               }
           })
           this.setState({
            usuarios: users
           })
       });
  }

  componentDidMount(){
    console.log("Listar Usuarios - Se cargo correctamente");
    this.actualizarListaUsuarios();
    console.log("Listar Usuarios - Se actualizaron los Usuarios");

    // Constructor
    // Render
    // DidMount
    // Destroy
  }

  render(){

  	var lista_usuarios = this.state.usuarios.map((usuario, index)=>{
  		return (
        <tr key={index}>
          <td align="left">{usuario.nombre}</td>
          <td align="left">{usuario.correo}</td>
          <td align="left">{usuario.clave}</td>
          <td align="left">
            <button onClick={() => (this.editarUsuario(usuario.id, usuario))}>Edit</button>
          </td>
          <td align="left">
            <button onClick={() => (this.eliminarUsuario(usuario.id))}>Remove</button>
          </td>
        </tr>
      );
  	});
  	
  	return (
  			<div class="center">
          <NavBar />
          <h2>Lista de Usuarios</h2>
          <div class="center-table">
            <table>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Correo</th>
                  <th>Clave</th>
                  <th/>
                  <th/>
                </tr>  
              </thead>
              <tbody>
                {lista_usuarios}
              </tbody>
              <caption align="bottom">Alejandria - Lista de Usuarios (2019)</caption>
            </table>
          </div>
          <AgregarUsuarios onAdd={this.agregarUsuario}>Agregar Usuarios</AgregarUsuarios>        
  			</div>

  		);
  }
}

// Default users to be used 
// Usuarios.defaultProps = {
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
//         }]}

export default Usuarios;