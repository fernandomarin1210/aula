import React from 'react';
import {useForm} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Api from '../../Api';
import {setToken} from '../../Auth';
import {useHistory} from 'react-router-dom';

function Login(){

    const history = useHistory();

    const {handleSubmit, register, errors} = useForm();

    const onSubmit = data => {
        Api.post('/users/login', {
            user: data.user,
            pass: data.password
        })
        .then(function(response){
            if(response.data.acess === 'true'){
                setToken(response.data.token);
            }            
        })
        .finally(function(){
            history.push('/admin/home');
            window.location.reload(true);
        })

    }

    return(
        <div className = "row">
            <div className = "col-md-1">

            </div>
            <div className = "col-md-10">
                <br></br>
                <h1>Login</h1>
                <br></br>
                <form onSubmit = {handleSubmit(onSubmit)}>
                    <div className = "form-group">
                        <label>Usuário:</label>
                        <input 
                            type = "text" 
                            className = "form-control"
                            name = "user"
                            ref = {register({required: "Campo obrigatório!"})}
                        >
                        </input>
                        <p style={{ color: "red" }}>
                            {errors.user && errors.user.message}
                        </p> 
                        <label>Senha:</label>
                        <input 
                            type = "text" 
                            className = "form-control"
                            name = "password"
                            ref = {register({required: "Campo obrigatório!"})}>
                        </input>
                        <p style={{ color: "red" }}>
                            {errors.password && errors.password.message}
                        </p> 
                    </div>
                    <button type = "submit" className = "btn btn-primary">Logar</button>
                    <br></br>
                    <br></br>
                </form>
            </div>
            <div className = "col-md-1">

            </div>

        </div>
    );
}

export default Login;