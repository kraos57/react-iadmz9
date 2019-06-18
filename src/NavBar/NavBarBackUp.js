import React from "react";
//import './NavBar.css';

function NavBar() {
  return (
    <div className="NavBar">
      <nav>
        <a href="#/libros"> Libros </a>|
        <a href="#/cart"> Carrito de Compras </a>|<a href="#/cart"> Logout </a>
      </nav>
    </div>
  );
}

export default NavBar;
