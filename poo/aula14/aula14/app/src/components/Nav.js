import React from 'react';
import {Link} from 'react-router-dom';

function Nav(){
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>&nbsp;<b>Menu</b>
      </button>
    
      <div class="collapse navbar-collapse navbar navbar-dark bg-dark" id="navbarSupportedContent">
        <ul className="navbar-nav">
            <li className="nav-item ">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/about">Sobre</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/product">Produtos</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/contact">Contato</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/contacts/view">Lista de Contatos</Link>
            </li>
        </ul>
        </div>
    </nav>
    )
}

export default Nav;