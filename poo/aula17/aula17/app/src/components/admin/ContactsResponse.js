import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../Api';
import { getToken } from '../../Auth';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

function ContactsResponse(){

    let {id} = useParams();
    const [contact, setContact] = useState([]);
    const {handleSubmit, register} = useForm();
    const history = useHistory();

    useEffect(() => {
        Api.get(`/contacts/${id}`, {
            params : {},
            headers : {
                    Authorization : "Bearer " + getToken()
                } 
            })
            .then((response) => {
                setContact(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            })
            .finally(() => {

            });
    },[id]);

    const onSubmit = (data) => {
        Api.post(`/contacts/update/${contact.idContact}`,
        {
            status: data.status,
            description: data.description
        },
        {
            headers:{
                Authorization: "Bearer " + getToken()
            }
        }
        )
        .then()
        .finally(
            history.push('/admin/contacts/view')
        );
    }

    const handleChange = (e) => {
        setContact({...contact, status: e.target.value})
    } 

    return(
        <>
            <br></br>
            <h1>Retorno ao Contato</h1>
            <br></br>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <table className = "table table-striped">
                    <thead>

                    </thead>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{contact.idContact}</td>
                        </tr>
                        <tr>
                            <th>Nome</th>
                            <td>{contact.name}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{contact.email}</td>
                        </tr>
                        <tr>
                            <th>Mensagem</th>
                            <td>{contact.message}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>
                                <div className = "form-group">
                                    <select name = "status" 
                                     value = {contact.status} 
                                     onChange = {handleChange}
                                     ref = {register}>
                                        <option disabled>Selecione um status</option>
                                        <option value = "0">Aberto</option>
                                        <option value = "1">Fechado</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Descrição do Retorno</th>
                            <td>
                                <div className = "form-group">
                                    <textarea 
                                        name = "description" 
                                        ref = {register} 
                                        defaultValue = {contact.description} />
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

export default ContactsResponse;