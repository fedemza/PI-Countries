import React from "react";
import './Paginado.css'

export default function Paginado ({countriesPerPage, allCountries, paginado, countriesFirstPage,currentPage}){

    const pageNumbers = []
     
    for (let i = 1; i <= Math.ceil((allCountries-countriesFirstPage)/countriesPerPage)+ 1; i++) {
       
       pageNumbers.push(i)
        
    }

    return (

        <nav className="navPaginado">
           
            <ul className="paginado" >
               { currentPage!==1?
                   <a onClick={() => paginado(currentPage-1)}>prev</a>:<></>
               }
            


                { pageNumbers && pageNumbers.map(number => (<div>
                    
                    <li className="number" key={number} >
                    <a onClick={() => paginado(number)}>{number}</a>
                    </li></div>
                ))}
                
                { currentPage!==26?
                   <a onClick={() => paginado(currentPage+1)}>next</a>:<></>
               }
            </ul>

        </nav>
    )
}