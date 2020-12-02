import React from 'react'

function Nav(props){
    return (
        <nav class="navbar navbar-expand-lg navbar-light">

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>&nbsp;<b>Menu</b>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
            <li className="nav-item ">
                <a className="nav-link" href = "#header" onClick = {()=>props.onSetPage('Home')}>Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href = "#header" onClick = {()=>props.onSetPage('Componentes')}>Componentes</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href = "#header" onClick = {()=>props.onSetPage('Props')}>Props</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href = "#header" onClick = {()=>props.onSetPage('State')}>State</a>
            </li>
        </ul>
        </div>
    </nav>
    )
}

export default Nav;