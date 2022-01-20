import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getCountries, filterCountriesByContinent, orderByName, orderByPopulation,
     filterCountriesByActivity, filterCountriesByActivityName} from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import './Home.css'

export default function Home (){
    
    
    const dispatch = useDispatch()
    const allCountries = useSelector ((state) => state.countries);
    const allCountriesB = useSelector ((state) => state.allCountries);
   
    
   const actividades=[]
    const activities = allCountriesB.map(el=> {
        if(el.activities.length){
            el.activities.map(a=>actividades.push(a.name))
        }
        
     } )
    
    var activitiesUnique= []
    for(var i = 0; i < actividades.length; i++) {
        
        
        const elemento = actividades[i].toLowerCase();
        
        if (!activitiesUnique.includes(elemento)) {
            activitiesUnique.push(elemento);
        }
      }
     let subRegion=[]
     allCountriesB.map(el=>{ if(!subRegion.includes(el.subregion)){subRegion.push(el.subregion)}})
    const [orden, setOrden] = useState('')
    const [continent,setContinent]=useState()
    const [order,setOrder]=useState()
    const [population,setPopulation]=useState()
    const [season,setSeason]=useState()
    const [activity,setActivity]=useState()
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
        setContinent('All');
        setOrder('Order');
        setPopulation('Population')
        setSeason('All')
        setActivity('All')
        
     
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(e.target.value)
        setOrder(e.target.value)
    }
    function handleSortPopulation(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value))
        setCurrentPage(1)
        setOrden(e.target.value)
        setPopulation(e.target.value)
    }
  
    function handleFilterContinent(e){
        dispatch(filterCountriesByContinent(e.target.value))
        setCurrentPage(1)
        setContinent(e.target.value)
    }
  
    function handleFilterActivity(e){
        dispatch(filterCountriesByActivity(e.target.value))
        setSeason(e.target.value)
    }
    function handleFilterActivitiesName(e){
        dispatch(filterCountriesByActivityName(e.target.value));
        setActivity(e.target.value)
        
    }


    return(
        <div className='container'>
          
            <h1 className='titleHome'>“Una vez al año viaja a un lugar en el que nunca hayas estado antes”</h1>
            <h1 className='titleHome'> Dalai Lama</h1>
            <div>
            <Link to= '/activity'> 
            <button className='buttonCreate'>Crear Actividad</button>
           </Link>
            </div>
            <button className='buttonReload'  onClick={e=> {handleClick(e)}}>
                Volver a cargar todos los Paises
            </button>
            <div>
           
            <div className='filtersBox'>
            <select className='filter' value={order} onChange={e => handleSort(e)}>
                  <option value='Order'>Ordenar</option>
                    <option value='AZ'>A-Z</option>
                    <option value='ZA'>Z-A</option>
            </select>
            <select className='filter' value={population} onChange={e => handleSortPopulation(e)}  >
                    <option value='Population'>Poblacion</option>
                    <option value='Populationdesc'>Población+</option>
                    <option value='Populationasc'>Población-</option>
                </select>
             
             

                <select className='filter' value={continent} onChange={e => handleFilterContinent(e)}>
                    <option value='All'>Continentes</option>
                    <option value='Americas'>América</option>
                    <option value='Asia'>Asia</option>
                    <option value='Africa'>África</option>
                    <option value='Europe'>Europa</option>
                    <option value='Oceania'>Oceanía</option>
                    <option value='Antarctic'>Antártida</option>
                </select>
               
                <select className='filter' value={season} onChange={e => handleFilterActivity(e)}>
                    <option value='All'>Actividades por Temporada</option>
                    <option value='Verano'>Verano</option>
                    <option value='Primavera'>Primavera</option>
                    <option value='Invierno'>Invierno</option>
                    <option value='Otoño'>Otoño</option>
                </select>
                
                <select className='filter' value={activity} onChange={(e) => handleFilterActivitiesName(e)} >
                <option value='All'>Actividades</option>
                    {activitiesUnique.map(el => 
                         ( 
                    <option value={el.toLowerCase()}>{el.charAt(0).toUpperCase() + el.slice(1).toLowerCase()}</option>
                    ))}
                </select>
                </div>

                <Paginado 
                countriesPerPage={countriesPerPage}
                countriesFirstPage={countriesFirstPage}
                allCountries={allCountries.length}
                paginado={paginado}
                />

                <SearchBar/> 
                
                <div className='cardBox'>
                {currentCountries?.map(el => { 

                
                    return (
                        <fragment>
                        <Link className='link' to={'countries/' + el.id}>
                        <Card name={el.name} image={el.image} continent={el.continent} key={el.id} /> 
                        </Link>
                        </fragment>
                       
                 ) 
                 
                 } )}
                </div>
            
               {/* <Paginado 
                countriesPerPage={countriesPerPage}
                countriesFirstPage={countriesFirstPage}
                allCountries={allCountries.length}
                paginado={paginado}
                /> */}
             </div>
            
        </div>
    )  

}