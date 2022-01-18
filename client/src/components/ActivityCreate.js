import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {getCountries, postActivity} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";
import './ActivityCreate.css'


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
    if (input.countries.length===0) {
        errors.countries = 'Por favor selecciona al menos, un pais'
    }
    console.log('soy countries',input.countries)
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
       if(e.target.value !=='' && !input.countries.includes(e.target.value))  
     {   setInput({
            ...input,
            countries:[...input.countries,   e.target.value]
            
        });
        setErrors(validate({
              ...input,
              [e.target.name]: e.target.value
          }))
    }}
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
        || !input.season || input.countries.length<1 || input.season=='' || input.difficulty=='' 
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
        <div className="containerCreateActivity">
            <Link to='/home' ><button className='btnBack' >Volver</button>  </Link>
            <h1 className="title">Crea una Actividad</h1>
            <div className="create">

            
            <form className="form" onSubmit={(e) => handleSubmit(e)} >
            <div>
                <label className="label" for='nombre'>Nombre:</label>
                <input className="inputForm" id='nombre' type='text' value={input.name} name='name' onChange={(e) => handleChange(e)} />
                
                {errors.name&& (
                    <p  className='error' >{errors.name}</p>
                )}
            </div>
            <div> 
               
                <label className="label">Dificultad:</label>

                <select className="inputForm" name='difficulty' onChange={(e) => handleSelectDifficulty(e)} >
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
                <label className="label">Duración:</label>
                <input className="inputForm" type='text' value={input.duration} name='duration' onChange={(e) => handleChange(e)} />
                {errors.duration&& (
                    <p  className='error' >{errors.duration}</p>
                )}
            </div>
            <div>
                <label className="label">Temporada:</label>
                <select className="inputForm" name='season' onChange={(e) => handleSelectSeason(e)} >
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
            <label className="label" >Paises:</label> 
                <select className="inputForm" name='countries' onChange={(e) => handleSelect(e)} >
                            
                <option value=''></option>
                    {countries.map((c) => (
                            <option value={c.name}>{c.name}</option>
                    ))}
                </select>
                {errors.countries&& (
                    <p  className='error' >{errors.countries}</p>
                )}
                 <div className="listCountries">
            {input.countries.map(e =>  e?
                <div >
                   
                    <p className="countriesList" >{e}  {' '}
                   
                    <button className="buttonList" name='countries' value={e} onClick={() => handleDelete(e)} >x</button>
                   
                    </p>
                
                </div>: null
                )}   
            </div>   
               
                <div>

                <button className='buttonCreateActivity' type="submit" >Crear Actividad</button>

                </div>
            </form>
            </div>
                    
        

        </div>


    )
}