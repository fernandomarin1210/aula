import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import Api from '../../../Api';
import { getToken } from '../../../Auth';
import SearchBar from '../../common/SearchBar';
import ReactLoading from 'react-loading';
import AddBox from '@material-ui/icons/AddBox';
import { green, red, yellow } from '@material-ui/core/colors';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/DeleteForever';

export default function ClientsView(){

    const [clients, setClients] = useState([]);
    const history = useHistory();

    useEffect(() => {
        Api.get('/clients', {
            params : {},
            headers : {
                    Authorization : "Bearer " + getToken()
                } 
            })
            .then((response) => {
                setClients(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            })
            .finally(() => {

            });
    },[]);

    const handleClickUpdate = (id) => {
        history.push(`/admin/clients/update/${id}`);
    } 

    const handleClickDelete = (id) => {
        Api.post(`/clients/delete/${id}`, {}, 
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

    const handleClickInsert = () => {
        history.push("/admin/clients/insert");
    } 

    return(
        <div className = "row">
            <div className = "col-md-1">
            </div>
            <div className = "col-md-10">
                <br></br>
                <div style={{float:'left'}}>
                    <h1>Clientes</h1>
                </div>

                {clients.length === 0 ? (
                    <ReactLoading
                        type = "spin"
                        color = "black"
                        className = "loading"
                    />
                ):(
                <>
                <div style={{float:'right'}}>
                    <SearchBar path = '/clients/search' handle = {function(data){setClients(data)}} />
                </div>
                <div style = {{clear:'left'}}>
                   <hr></hr>
                </div>
                
                <div id = "Insert" title = "Inserir Cliente" style={{cursor:'pointer'}} onClick = { () => handleClickInsert()}><br></br><AddBox style={{ color: green[500], fontSize: 35}}
                                            /> <b>Inserir Cliente</b></div>
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
                                Fone
                            </th>
                            <th>
                                Endereço
                            </th>
                            <th colSpan = "2">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client, index) => 
                            <tr key={index}>
                                <td>{client.idClient}</td>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.phone}</td>
                                <td>{client.address}</td>
                                <td id = "Insert" title = "Editar Cliente" style={{cursor:'pointer', clear:'left'}} onClick = { () => handleClickUpdate(client.idClient)}>
                                    <Edit style={{ color: yellow[900], fontSize: 35}} />
                                            
                                </td>
                                <td id = "Insert" title = "Excluir Cliente" style={{cursor:'pointer', clear:'left'}} onClick = { () => handleClickDelete(client.idClient)}>
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
