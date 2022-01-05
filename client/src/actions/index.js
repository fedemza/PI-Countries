import axios from 'axios'

export function getCountries(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/countries');
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
}

export function orderByName(payload){

    return{
        type: 'ORDER_BY_NAME',
        payload
    }

}
export function orderByPopulation(payload){

    return{
        type: 'ORDER_BY_POPULATION',
        payload
    }

}
export function filterCountriesByContinent(payload){

    return{
        type: 'FILTER_BY_CONTINENT',
        payload
    }

}
export function filterCountriesByActivity(payload){

    return{
        type: 'FILTER_BY_ACTIVITY',
        payload
    }

}
export function filterCountriesByActivityName(payload){

    return{
        type: 'FILTER_BY_ACTIVITY_NAME',
        payload
    }

}