import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {isAdmin, deleteToken} from '../Auth';

function Nav(){

    const history = useHistory();

    const logout = () => {
        deleteToken();
        history.push('/users/login');
        window.location.reload(true);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>&nbsp;<b>Menu</b>
      </button>
    
      <div className ="collapse navbar-collapse navbar navbar-dark bg-dark" id="navbarSupportedContent">
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
        </ul>
        <ul className = "navbar-nav ml-auto">
            {
                isAdmin()?
                    <> 
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/clients/view">Clientes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/contacts/view">Contatos</Link>
                        </li>
                        <li className = "nav-item">
                            <Link onClick = {logout} className="nav-link">Logout</Link>
                        </li>
                    </>
                :
                    <>
                        <li className = "nav-item">
                            <Link className="nav-link" to="/users/login">Login</Link>
                        </li>
                    </>
            }
        </ul>
        </div>
    </nav>
    )
}

export default Nav;