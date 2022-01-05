import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getCountries, filterCountriesByContinent, orderByName, orderByPopulation,
     filterCountriesByActiviy, filterCountriesByActiviyName} from '../actions';
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
    const indexOfLastCountry = currentPage===1? countriesFirstPage: countriesPerPage*currentPage-difCountriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - (currentPage===1?countriesFirstPage:countriesPerPage);
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)
  
 
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(()=>{
        dispatch(getCountries());
    },[dispatch])


    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries());
       
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleSortPopulation(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
  
    function handleFilterContinent(e){
        dispatch(filterCountriesByContinent(e.target.value))
        setCurrentPage(1)
    }
    function handleFilterActivity(e){
        dispatch(filterCountriesByActiviy(e.target.value))
    }
    function handleFilterActivitiesName(e){
        dispatch(filterCountriesByActiviyName(e))
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
                    <option value='AZ'>A-Z</option>
                    <option value='ZA'>Z-A</option>
            </select>
            <select onChange={e => handleSortPopulation(e)}  >
                    <option value='Population'>Poblacion</option>
                    <option value='Populationdesc'>+Población</option>
                    <option value='Populationasc'>-Población</option>
                </select>
             
             

                <select onChange={e => handleFilterContinent(e)}>
                    <option value='All'>Continentes</option>
                    <option value='Americas'>América</option>
                    <option value='Asia'>Asia</option>
                    <option value='Africa'>África</option>
                    <option value='Europe'>Europa</option>
                    <option value='Oceania'>Oceanía</option>
                    <option value='Antarctic'>Antártida</option>
                </select>
                <select onChange={e => handleFilterActivity(e)}>
                    <option value='All'>Actividades por Estaciones</option>
                    <option value='Verano'>Verano</option>
                    <option value='Primavera'>Primavera</option>
                    <option value='Invierno'>Invierno</option>
                    <option value='Otoño'>Otoño</option>
                </select>
                
                <select onChange={(e) => handleFilterActivitiesName(e)} >
                <option value='All'>Actividades</option>
                    {activities.map((a) => (
                            <option value={a.name}>{a.name}</option>
                    ))}
                </select>
                <Paginado 
                countriesPerPage={countriesPerPage}
                countriesFirstPage={countriesFirstPage}
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