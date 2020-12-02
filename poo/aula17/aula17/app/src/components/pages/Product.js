import React, { useEffect, useState } from 'react';
import {Link, Switch, Route, useRouteMatch, useParams} from 'react-router-dom'; 
import Api from '../../Api';

function Product(){

    let {path, url} = useRouteMatch();

    return(
        <>
        <br></br>
        <div className = "row">
            <div className = "col-md-1"></div>
            <div className = "col-md-10">
                <h1>Produtos</h1>
                <ul>
                    <li><Link to = {`${url}/1`}>Categoria 1</Link></li>
                    <li><Link to = {`${url}/2`}>Categoria 2</Link></li>
                    <li><Link to = {`${url}/3`}>Categoria 3</Link></li>
                </ul>

                <Switch>
                    <Route exact path = {path}>
                        <AllCategory />
                    </Route>
                    <Route path = {`${path}/:catId`}>
                        <Category />
                    </Route>
                </Switch>

            </div>
            <div className = "col-md-1"></div>
        </div>
        </>
    );
}

export default Product;

function Category(){

    let {catId} = useParams();

    const [products, setProducts] = useState([]);

    useEffect(() =>{
        Api.get(`/products/category/${catId}`)
        .then((response) => {
            setProducts(response.data);
        })
    },[catId])

    return(
        <>
        <h3>Categoria {catId} foi selecionada</h3>
        <table className = "table table-striped">
            <thead>
                <th>Nome</th>
                <th>Preço</th>
                <th>Descrição</th>
            </thead>
            <tbody>
                {products.map((product, index) =>
                    <tr key = {index}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.description}</td>
                    </tr>
                )}
            </tbody>
        </table>
        </>
    );
}

function AllCategory(){

    const [products, setProducts] = useState([]);

    useEffect(() =>{
        Api.get('/products')
        .then((response) => {
            setProducts(response.data);
        })
    },[])

    return(
        <>
        <h3>Todos os Produtos</h3>
        <table className = "table table-striped">
            <thead>
                <th>Nome</th>
                <th>Preço</th>
                <th>Descrição</th>
            </thead>
            <tbody>
                {products.map((product, index) =>
                    <tr key = {index}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.description}</td>
                    </tr>
                )}
            </tbody>
        </table>
        </>
    );
}