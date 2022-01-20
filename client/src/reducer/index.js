const initialState = {
    countries:[],
    allCountries:[],
    detail:{}
   
}

function rootReducer (state = initialState, action){
    switch(action.type) {
        case 'GET_COUNTRIES':
            return{
                ...state,
                countries:action.payload,
                allCountries:action.payload,
                
            }
        case 'GET_NAME_COUNTRIES':
            return{
                ...state,
                countries:action.payload,
            }
        
         case 'POST_COUNTRY':
                return{
                    ...state
                }
          case 'GET_DETAILS':
                    return{
                        ...state,
                        detail:action.payload
                    }
            
        
        case 'FILTER_BY_CONTINENT':
            const allCountries = state.allCountries
            const continentFiltered = action.payload === 'All' ? allCountries : allCountries.filter(el => el.continent === action.payload)    
        
        return{
                ...state,
                countries: continentFiltered
                
            }
        
         
            case 'ORDER_BY_NAME':


                let sortedArr  
              if  (action.payload === 'AZ' )
             sortedArr=  state.countries.sort(function (a,b) {
                    if (a.name>b.name) {
                        return 1;
                    }
                    if (b.name>a.name) {
                        return -1;
                    }
                    return 0;

                });
                if  (action.payload === 'ZA' )
              sortedArr=  state.countries.sort(function (a,b) {
                    if (a.name>b.name) {
                        return -1;
                    }
                    if (b.name>a.name) {
                        return 1;
                    }
                    return 0;
                }) 
                if  (action.payload === 'Order' )
              sortedArr=  state.countries.sort(function (a,b) {
                  
                    return 0
                }) 
               
            return{
                ...state,
                countries: sortedArr
             }
            case 'ORDER_BY_POPULATION':
                let sortedArrP  
                
                if (action.payload === 'Populationasc' )
              sortedArrP = state.countries.sort(function (a,b) {
                    if (a.population>b.population) {
                        return 1;
                    }
                    if (b.population>a.population) {
                        return -1;
                    }
                    return 0;

                }) 
                if (action.payload === 'Populationdesc' )
              sortedArrP=  state.countries.sort(function (a,b) {
                    if (a.population>b.population) {
                        return -1;
                    }
                    if (b.population>a.population) {
                        return 1;
                    }
                    return 0;
                })
                if (action.payload === 'Population' )
              sortedArrP=  state.countries.sort(function (a,b) {
                  
                    return 0
                })
            return{
                ...state,
                countries: sortedArrP
             }

           
        case 'FILTER_BY_ACTIVITY':
            const allCountriesA = state.allCountries
            const activityFiltered = action.payload === 'All' ? allCountriesA : 
            allCountriesA.filter((el) => el.activities?.filter((a) => a.season === action.payload).length)
        
        return{
                ...state,
                countries: activityFiltered
                
            }

        case 'FILTER_BY_ACTIVITY_NAME':
            const allCountriesB = state.allCountries
            const activityFilteredName = action.payload === 'All' ? allCountriesB : 
            allCountriesB.filter(el => el.activities?.filter(a => a.name.toLowerCase() === action.payload).length)    
        
        return{
                ...state,
                countries: activityFilteredName
                
            }
      
        
        default: 
            return state;
}
    
        }    
    
   


export default rootReducer;