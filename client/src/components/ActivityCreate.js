import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {getCountries, postActivity} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";


function validate(input) {
    let errors = {};
    console.log('soy la validacion ', (/^[a-zA-Z0-9\_\-]{2,20}$/).test(input.name))
    if(!/^[a-zA-Z0-9\_\-]{2,20}$/.test(input.name)) {
        errors.name = 'Se requieren entre 2 y 20 caracteres, no se permiten simbolos';
    } else if (!input.countries) {
        errors.countries = 'Por favor selecciona un pais'
    }
    return errors
}


export default function ActivityCreate(){
    const dispatch = useDispatch();
    const countries = useSelector ((state) => state.countries)
    const history = useHistory()
    const [errors,setErrors] = useState({});
    
   

    const [input,setInput] = useState({
        name:'',
        difficulty:'',
        duration: '',
        season:'',
        countries:[]
    
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] :   e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                difficulty: e.target.value
            })
        }
    }

    function handleSelect(e){
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
    }
    function handleSelectDifficulty(e){
        setInput({
            ...input,
            difficulty: e.target.value
        })
    }
    function handleSelectSeason(e){
        setInput({
            ...input,
            season: e.target.value
        })
    }
    function handleSubmit(e){
        if(
            !input.name || !input.difficulty || !input.duration
        || !input.season || !input.countries.length 
        ){ alert('completar todo lo requerido')}
        else{

            e.preventDefault();
            console.log(input)
            dispatch(postActivity(input));
            alert('Actividad Creada!!')
            setInput({
                name:'',
                difficulty:'',
                duration: '',
                season:'',
                countries:[]
            })
            history.push('./home')
        }
      
    }    
       function handleDelete(e){
           setInput({
               ...input,
               countries: input.countries.filter (c => c !== e)
           })
       }
    

    useEffect(() => {
        dispatch(getCountries());
    },[])
    return(
        <div>
            <Link to='/home' ><button>Volver</button>  </Link>
            <h1>Creá una Actividad</h1>
            <form onSubmit={(e) => handleSubmit(e)} >
            <div>
                <label  for='nombre'>Nombre:</label>
                <input id='nombre' type='text' value={input.name} name='name' onChange={(e) => handleChange(e)}  required/>
                
                {errors.name&& (
                    <p  className='error' >{errors.name}</p>
                )}
            </div>
            <div> 
               {/* HACER EL CONTROL DE LAS CHEKBOXES QUE SOLO ME DEJE ELEGIR UNA */}
                <label>Dificultad:</label>

                <select onChange={(e) => handleSelectDifficulty(e)} >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
                {/* <label><input
                type='checkbox'
                name='1'
                value='1'
                onChange={(e) => handleCheck(e)}
                />1</label>
                <label><input
                type='checkbox'
                name='2'
                value='2'
                onChange={(e) => handleCheck(e)}
                />2</label>
                <label><input
                type='checkbox'
                name='3'
                value='3'
                onChange={(e) => handleCheck(e)}
                />3</label>
                <label><input
                type='checkbox'
                name='4'
                value='4'
                onChange={(e) => handleCheck(e)}
                />4</label>
                <label><input
                type='checkbox'
                name='5'
                value='5'
                onChange={(e) => handleCheck(e)}
                />5</label> */}
               
            </div>
            <div>
                <label>Duración:</label>
                <input type='text' value={input.duration} name='duration' onChange={(e) => handleChange(e)} required/>
            </div>
            <div>
                <label>Temporada:</label>
                <select onChange={(e) => handleSelectSeason(e)} >
                    <option >Estaciones</option>
                    <option value='Verano'>Verano</option>
                    <option value='Primavera'>Primavera</option>
                    <option value='Invierno'>Invierno</option>
                    <option value='Otoño'>Otoño</option>
                </select>
            </div> 
            <label>Paises</label> 
                <select onChange={(e) => handleSelect(e)} >
                            

                    {countries.map((c) => (
                            <option value={c.name}>{c.name}</option>
                    ))}
                </select>
              
               
                <div>

                <button type="submit" > Crear Actividad </button>

                </div>
            </form>

            {input.countries.map(e => 
                <div>
                    <p>{e}</p>
                    <button onClick={() => handleDelete(e)} >x</button>


                </div>)}           

        </div>


    )
}