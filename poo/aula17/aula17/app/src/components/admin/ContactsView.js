import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import Api from '../../Api';
import { getToken } from '../../Auth';
import SearchBar from '../common/SearchBar';
import ReactLoading from 'react-loading';
import { red, yellow } from '@material-ui/core/colors';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/DeleteForever';

function ContactsView(){

    const [contacts, setContacts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        Api.get('/contacts', {
            params : {},
            headers : {
                    Authorization : "Bearer " + getToken()
                } 
            })
            .then((response) => {
                setContacts(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            })
            .finally(() => {

            });
    },[]);

    const handleClickResponse = (id) => {
        history.push(`/admin/contacts/response/${id}`);
    } 
    
    const handleClickDelete = (id) => {
        Api.post(`/contacts/delete/${id}`, {}, 
        {
            headers:{
                Authorization: "Bearer " + getToken()
            }
        }            )
        .catch((errors) => {
            console.log(errors);
        })
        .then((response) => {
            console.log(response);
        })
        .finally(() => {
            window.location.reload(true);
        });
    } 

    return(
        <div className = "row">
            <div className = "col-md-1">
            </div>
            <div className = "col-md-10">

                <br></br>
                <div style={{float:'left'}}>
                    <h1>Listagem de Contatos</h1>
                </div>

                {contacts.length === 0 ? (
                    <ReactLoading
                        type = "spin"
                        color = "black"
                        className = "loading"
                    />
                ):(
                
                <>
                <div style={{float:'right'}}>
                    <SearchBar path = '/contacts/search' handle = {function(data){setContacts(data)}} />
                </div>
                <div style = {{clear:'left'}}>
                   <hr></hr>
                </div>
                <br></br>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Nome
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                Mensagem
                            </th>
                            <th>
                                Status
                            </th>
                            <th colSpan = "2">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => 
                            <tr key={index}>
                                <td>{contact.idContact}</td>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.message}</td>
                                <td>{contact.status}</td>

                                <td id = "Insert" title = "Responder Contato" style={{cursor:'pointer', clear:'left'}} onClick = { () => handleClickResponse(contact.idContact)}>
                                    <Edit style={{ color: yellow[900], fontSize: 35}} />
                                            
                                </td>
                                <td id = "Insert" title = "Excluir Contato" style={{cursor:'pointer', clear:'left'}} onClick = { () => handleClickDelete(contact.idContact)}>
                                    <Delete style={{ color: red[500], fontSize: 35}} />
                                            
                                </td>
                            </tr>                            
                        )}
                    </tbody>

                </table>

                </>
            
                )

            }

            </div>
        </div>
    )

}

export default ContactsView;