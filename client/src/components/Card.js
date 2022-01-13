import React from "react";
import './Card.css'

export default function Card ({name, image, continent}) {
    return (
        <div className="card">
            <div className="image">
            <img src ={image} alt='img not found'  /> 
            </div>
          
            <div className="text">
            <h3 className="name">{name}</h3>
            <h5 className="continent">{continent}</h5>
            </div>
           
        </div>
    )
}


