import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../../Api';
import { getToken } from '../../../Auth';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

function ClientUpdate(){

    let {id} = useParams();
    const [Client, setClient] = useState([]);
    const {handleSubmit, register} = useForm();
    const history = useHistory();

    useEffect(() => {
        Api.get(`/clients/${id}`, {
            params : {},
            headers : {
                    Authorization : "Bearer " + getToken()
                } 
            })
            .then((response) => {
                setClient(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            })
            .finally(() => {

            });
    },[id]);

    const onSubmit = (data) => {
        Api.post(`/clients/update/${Client.idClient}`,
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
            <h1>Alterar Cliente</h1>
            <br></br>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <table className = "table table-striped">
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{Client.idClient}</td>
                        </tr>
                        <tr>
                            <th>Nome</th>
                            <td>
                                <div className = "form-group">
                                    <input type = "text" size = "100"
                                        name = "name" 
                                        ref = {register} 
                                        defaultValue = {Client.name} />
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
                                        defaultValue = {Client.phone} />
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
                                        defaultValue = {Client.email} />
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
                                        defaultValue = {Client.address} />
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

export default ClientUpdate;