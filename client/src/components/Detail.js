import React, { useEffect} from "react";
import {Link} from 'react-router-dom';
import {getCountries} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch ()
    useEffect(()=> {
        dispatch(getDetails(props.match.params.id))
    },[dispatch])

    const myCountry= useSelector ((state) => state.detail )


    return (
        <div>

        { myCountry.length > 0?
        <div>
            <h1> {myCountry[0].name}</h1>
            <img src ={myCountry[0].image
             ?myCountry[0].image:myCountry[0].background_image
            } alt='no hay imagen' />
            <h2>Description</h2>
            <h2>Fecha de lanzamiento: {myCountry[0].launchDate}</h2>
            <h2>Rating: {myCountry[0].rating}</h2>
            <h5>Genres: {!myCountry[0].createdInDb? myCountry[0].genres + ' ':myCountry[0].genres.map(el=>el.name + (' '))}</h5>
            <h5>Platforms: {myCountry[0].platforms}</h5>
        </div>  : <p>Loading...</p>  

    
        }

        <Link to='/home'>
            <button>Volver</button>
        </Link>




        </div>

    )


}