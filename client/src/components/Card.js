import React from "react";

export default function Card ({name, image, continent}) {
    return (
        <div>
            <img src ={image} alt='img not found' width='250px' height='160px' /> 
            <h3>{name}</h3>
            <h5>{continent}</h5>
        </div>
    )
}


