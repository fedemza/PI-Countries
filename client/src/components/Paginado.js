import React from "react";

export default function Paginado ({countriesPerPage, allCountries, paginado, countriesFirstPage}){

    const pageNumbers = []
     
    for (let i = 1; i <= Math.ceil((allCountries-countriesFirstPage)/countriesPerPage)+ 1; i++) {
       
       pageNumbers.push(i)
        
    }

    return (

        <nav>
            <ul className="paginado" >
                { pageNumbers && pageNumbers.map(number => (
                    <li className="number" key={number} >
                    <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}

            </ul>

        </nav>
    )
}