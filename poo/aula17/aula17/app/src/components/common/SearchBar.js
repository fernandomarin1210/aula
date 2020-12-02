import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import Api from '../../Api';
import { getToken } from '../../Auth';

export default function SearchBar(props){

    const {handleSubmit, register} = useForm();

    const handleSearch = data => {
        Api.get(`${props.path}/${data.search}`,{
            params:{},
            headers:{
                Authorization : 'Bearer ' + getToken()
            }
        })
        .then(function(response){
            props.handle(response.data);
        })
    }

    return(
        <div>
            <form onSubmit = {handleSubmit(handleSearch)}>
                <div className = "form-group" style={{float:'left'}}>
                    <label className = "sr-only" />
                    <input 
                        ref={register} 
                        type = "text" 
                        name = "search"
                        className = "form-control"
                        placeholder = "Pesquisar" />
                </div>
                <div style={{float:'right'}}>
                    <label className = "sr-only" />
                    <button className = "btn btn-success" type = "submit">
                        Pesquisar
                    </button>
                </div>
            </form>
        </div>
    );

}