import React from "react";
import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getNameCountries} from "../actions";
import './SearchBar.css'

export default function SearchBar () {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameCountries(name))
        setName('')   
    }

    return (
        <div>
            <input className="input" type = 'text' placeholder='Buscar...' value={name} onChange={(e)=> handleInputChange(e)} />
            <button className= 'buttonSearch'type='submit'  onClick={(e)=> handleSubmit(e)} >Buscar</button>

        </div>
    )

}