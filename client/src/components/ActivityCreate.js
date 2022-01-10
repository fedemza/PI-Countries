import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {getCountries, postActivity} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";


function validate(input) {
    let errors = {};
    console.log(errors)
    if(!/^[a-zA-Z0-9\_\-\' ']{2,20}$/.test(input.name)) {
        errors.name = 'Se requieren entre 2 y 20 caracteres, no se permiten simbolos';
    }; 
    if(!/^[a-zA-Z0-9\:\,\.\_\-\' ']{2,20}$/.test(input.duration)) {
        errors.duration = 'Se requieren entre 2 y 20 caracteres, no se permiten simbolos';
    }; 
    if(!input.difficulty) {
        errors.difficulty = 'Selecciona un nivel de dificultad';
    }; 
    if(!input.season) {
        errors.season = 'Selecciona una temporada';
    }; 
    if (input.countries.length<1) {
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

    function handleSelect(e){
        e.target.value!=='' ?
        setInput({
            ...input,
            countries: [...input.countries,   e.target.value]
        }):  setInput({
            ...input
            
        });
        setErrors(validate({
              ...input,
              [e.target.name]: e.target.value
          }))
    }
     function handleSelectDifficulty(e){
       setInput({
            ...input,
            difficulty: e.target.value
        });
        setErrors(validate({
              ...input,
              [e.target.name]: e.target.value
          }))
    }
    function handleSelectSeason(e){
        setInput({
            ...input,
            season: e.target.value
        });
        setErrors(validate({
              ...input,
              [e.target.name]: e.target.value
          }))
    }

    function  handleChange(e){
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

  

 
    function handleSubmit(e){
        if(
            !input.name || !input.difficulty || !input.duration
        || !input.season || !input.countries.length || input.season=='' || input.difficulty=='' 
        || errors.hasOwnProperty('name')   || errors.hasOwnProperty('duration')  
        
        ){ 
            alert('completar todo lo requerido correctamente')}
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
           });
       setErrors(validate({
            ...input,
            countries:input.countries.filter (c => c !== e)
        }))
        
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
               
                <label>Dificultad:</label>

                <select name='difficulty' onChange={(e) => handleSelectDifficulty(e)} >
                <option value=''></option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
               
                {errors.difficulty&& (
                    <p  className='error' >{errors.difficulty}</p>
                )}
            </div>
            <div>
                <label>Duración:</label>
                <input type='text' value={input.duration} name='duration' onChange={(e) => handleChange(e)} required/>
                {errors.duration&& (
                    <p  className='error' >{errors.duration}</p>
                )}
            </div>
            <div>
                <label>Temporada:</label>
                <select name='season' onChange={(e) => handleSelectSeason(e)} >
                    <option value=''></option>
                    <option value='Verano'>Verano</option>
                    <option value='Primavera'>Primavera</option>
                    <option value='Invierno'>Invierno</option>
                    <option value='Otoño'>Otoño</option>
                </select>
                {errors.season&& (
                    <p  className='error' >{errors.season}</p>
                )}
            </div> 
            <label>Paises</label> 
                <select name='countries' onChange={(e) => handleSelect(e)} >
                            
                <option value=''></option>
                    {countries.map((c) => (
                            <option value={c.name}>{c.name}</option>
                    ))}
                </select>
                {errors.countries&& (
                    <p  className='error' >{errors.countries}</p>
                )}
               
                <div>

                <button type="submit" > Crear Actividad </button>

                </div>
            </form>
                        
            {input.countries.map(e =>  e?
                <div >
                   
                    <p  >{e}</p>
                  
                    <button name='countries' value={e} onClick={() => handleDelete(e)} >x</button>
                   


                </div>: null
                )}           

        </div>


    )
}