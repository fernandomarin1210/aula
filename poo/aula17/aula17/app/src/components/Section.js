import React from 'react';
import './Section.css';
import {
    Switch,
    Route
} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import Contact from './pages/Contact';
import ContactsView from './admin/ContactsView';
import Login from './admin/Login'
import adminHome from './admin/Home';
import ContactResponse from './admin/ContactsResponse';
import ClientsView from './admin/clients/ClientsView';
import ClientUpdate from './admin/clients/UpdateClient';
import InsertClient from './admin/clients/InsertClient';
import PrivateRoute from './common/PrivateRoute';

function Section(props){
    return(
        <section id="section" className="container" style={{minHeight: '400px'}}>
            <Switch>
                <Route exact path = "/">
                    <Home/>
                </Route>
                <Route exact path = "/about">
                    <About/>
                </Route>
                <Route path = "/product">
                    <Product/>
                </Route>
                <Route exact path = "/contact">
                    <Contact/>
                </Route>

                <Route exact path = "/users/login">
                    <Login/>
                </Route>

                <PrivateRoute exact path = "/admin/home" component = {adminHome}>
                </PrivateRoute>

                <PrivateRoute exact path = "/admin/clients/view" component = {ClientsView}>
                </PrivateRoute>

                <PrivateRoute exact path = "/admin/clients/insert" component = {InsertClient}>
                </PrivateRoute>

                <PrivateRoute path = "/admin/clients/update/:id" component = {ClientUpdate}>
                </PrivateRoute>

                <PrivateRoute exact path = "/admin/contacts/view" component = {ContactsView}>
                </PrivateRoute>

                <PrivateRoute path = "/admin/contacts/response/:id" component = {ContactResponse}>
                </PrivateRoute>

            </Switch>
        </section>
    )
}

export default Section;