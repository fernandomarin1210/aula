import React from 'react';
import Api from '../../../Api';
import { getToken } from '../../../Auth';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

function InsertClient(){

    const {handleSubmit, register} = useForm();
    const history = useHistory();

    const onSubmit = (data) => {
        Api.post("/clients",
        {
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address
        },
        {
            headers:{
                Authorization: "Bearer " + getToken()
            }
        }
        )
        .then()
        .finally(
            history.push('/admin/clients/view')
        );
    }

    return(
        <>
            <br></br>
            <h1>Inserir Cliente</h1>
            <br></br>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <table className = "table table-striped">
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Nome</th>
                            <td>
                                <div className = "form-group">
                                    <input type = "text" size = "100"
                                        name = "name" 
                                        ref = {register} 
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Telefone</th>
                            <td>
                                <div className = "form-group">
                                    <input type = "text" size = "20"
                                        name = "phone" 
                                        ref = {register} 
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>
                                <div className = "form-group">
                                    <input type = "text" size = "100"
                                        name = "email" 
                                        ref = {register} 
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Endereço</th>
                            <td>
                                <div className = "form-group">
                                    <input type = "text" size = "100"
                                        name = "address" 
                                        ref = {register} 
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <td>
                                <button type = "submit" className = "btn btn-primary">Salvar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    )

}

export default InsertClient;