import React from 'react';
import { isAdmin } from '../../Auth';
import { Route } from 'react-router-dom';

export default function PrivateRoute({component: Component, ...rest}) {
    return(
        <Route 
            {...rest}
            render = {
                props => (
                    isAdmin() ?
                        <Component {...props} />
                    :
                        console.log("Não logado")
                )
            }
        />
    )
}