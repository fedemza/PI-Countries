import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage() { 
    return (
        <div className='containerLanding'>
            
            <h1 className='titleLanding'> EL MUNDO TE ESPERA </h1>
            <Link  to='/home'>
                <button className='button'>Ingresar</button>
            </Link>

         
            
         </div>
            
    )
}