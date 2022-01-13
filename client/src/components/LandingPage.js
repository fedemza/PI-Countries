import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage() { 
    return (
        <div className='container'>
            
            <h1 className='title'> El mundo te espera </h1>
            <Link  to='/home'>
                <button className='button'>Ingresar</button>
            </Link>

         
            
         </div>
            
    )
}