import React from 'react';
import './Section.css';

function Section(props){
    return(
        <section id="section" className="container">
        <div className="row">
        <div className="col-sm-1"></div>
        <div className="col-sm-10">
            <h1>Página {props.onPage}</h1>
            <h5>xxxxx</h5>
        </div>
        <div className="col-sm-1"></div>
        </div>
    </section>
    )
}

export default Section;