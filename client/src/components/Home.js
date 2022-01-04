import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getCountries} from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';

export default function Home (){

    const dispatch = useDispatch()
    const allCountries = useSelector ((state) => state.countries);
    const activities = useSelector ((state) => state.activities);
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const countriesFirstPage = 9
    const countriesPerPage = 10
    const difCountriesPerPage = countriesPerPage-countriesFirstPage
    const indexOfLastCountry = currentPage==1? countriesFirstPage: countriesPerPage*currentPage-difCountriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - (currentPage==1?countriesFirstPage:countriesPerPage);
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)
  

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(()=>{
        dispatch(getCountries());
    },[dispatch])


    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries())
    }

    function handleSort(){
        
    }
    function handleFilterCreated(){

    }
    function handleFilterContinent(){

    }
    function handleFilterActivities(){

    }


    return(
        <div>
            <Link to= '/activity'> Crear Actividad</Link>
            <h1>Paises</h1>
            <button onClick={e=> {handleClick(e)}}>
                Volver a cargar todos los Paises
            </button>
            <div>
            <select onChange={e => handleSort(e)}>
                    <option value='Order'>Ordenar</option>
                    <option value='A-Z'>A-Z</option>
                    <option value='Z-A'>Z-A</option>
            </select>
            <select>
                    <option value='Population'>Poblacion</option>
                    <option value='Populationdesc'>+Población</option>
                    <option value='Populationasc'>-Población</option>
                </select>
             
                <select onChange={e => handleFilterCreated(e)}>
                    <option value='all'>Todos</option>
                    <option value='api'>Existentes</option>
                    <option value='created'>Creados</option>

                </select>

                <select onChange={e => handleFilterContinent(e)}>
                    <option value='All'>Continentes</option>
                    <option value='América'>América</option>
                    <option value='Asia'>Asia</option>
                    <option value='África'>África</option>
                    <option value='Europa'>Europa</option>
                    <option value='Oceanía'>Oceanía</option>
                </select>
                
                <select onChange={(e) => handleFilterActivities(e)} >
                    {activities.map((a) => (
                            <option value={a.name}>{a.name}</option>
                    ))}
                </select>
                <Paginado 
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paginado={paginado}
                />

                {
                currentCountries?.map(el => {
                    return (
                        <fragment>
                        <Link to={'home' + el.id}>
                        <Card name={el.name} image={el.image} continent={el.continent} key={el.id} /> 
                        </Link>

                        </fragment>
                       
                 ) } )}

             </div>
        </div>
    )  

}