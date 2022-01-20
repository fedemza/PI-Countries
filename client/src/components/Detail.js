import React, { useEffect} from "react";
import {Link} from 'react-router-dom';
import {getDetails} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";
import './Detail.css'

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch ()
   

    useEffect(()=> {
        dispatch(getDetails(props.match.params.id))
    },[dispatch])
   

    const myCountry= useSelector ((state) => state.detail )
    //console.log('soy myCountry',myCountry)

    return (

        <div>  

            
           
        <div className="containerDetail">
         
            
            <div className="cardDetail">
        { myCountry.length > 0?
        <div className="content">
            
            
            <img className="flag" src ={myCountry[0].image} alt='no hay imagen' />
            <div className="infoContainer"> 
            
            
            <h1> {myCountry[0].id}</h1>
            <h2> {myCountry[0].name}</h2>
            <h3> <span className="titleItem"> Capital:</span> {myCountry[0].capital}</h3>
            <h3> <span className="titleItem"> Continente:</span> {myCountry[0].continent}</h3>
            <h3><span className="titleItem">  Subregion:</span> {myCountry[0].subregion}</h3>
            <h3> <span className="titleItem"> Area:</span> {(myCountry[0].area)/1000000} millones de KM²</h3>
            <h3> <span className="titleItem"> Población:</span> {myCountry[0].population} habitantes</h3>
            <div>  <h3>  <span className="titleItem">  Actividades:</span></h3>
            {myCountry[0].activities.length?myCountry[0].activities.map(el=>(
                <div className="activities">      
                <h5 className="activityName"><u className="activityName" >{el.name.toUpperCase()}</u></h5>
                <h5 className="detailItem">-Dificultad: {el.difficulty}</h5>
                <h5 className="detailItem">-Duracion: {el.duration}</h5>
                <h5 className="detailItem">-Temporada: {el.season}</h5>
                </div>
               
            ))
            
            
            : (<h4 className="activities">No hay Actividades</h4>)}
            </div></div>
        </div>  : <p>Loading...</p>  

    
        }
         
        </div>
         
        
        </div>
        <Link to='/home'>
            <button className="buttonD">Volver</button>
        </Link>
        </div>
    )


}