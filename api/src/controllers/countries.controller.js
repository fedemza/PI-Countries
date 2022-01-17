const axios=require('axios');
const { Country, Activity} = require ('../db');


const loadDB = async ()=>{
    const apiUrl= await axios.get('https://restcountries.com/v3/all');
    
    try {

        const apiInfo= await apiUrl.data.map(el=>{
        
            Country.findOrCreate({
  
              where:{
                  id:el.cca3,
                  name:el.name.common,
                  image:el.flags[1],
                  continent:el.region,
                  capital:el.capital?el.capital[0]:'no se encontro capital',
                  subregion:el.subregion?el.subregion:'no se encontró subregion',
                  area:parseInt(el.area) ? parseInt(el.area) : 0,
                  population:parseInt(el.population)?parseInt(el.population):0
  
              }
            })
  
          })
    
    } catch (e) {
        console.log(e)
    }
    
    
    
};

loadDB();


const getDbInfo=async()=>{

    return await Country.findAll({
        include:Activity

    })
}

const getCountriesQuery= async (req,res,next) => {
    const { name } = req.query
    let countriesTotal = await getDbInfo();

    try {

        if(name){
            let countryName = await countriesTotal.filter ( el => el.name.toLowerCase().includes(name.toLowerCase()))
            countryName.length ?
            res.status(200).send(countryName):
            res.status(404).send('No se encontró el país, vuelva a intentar por favor')
        } else{

            next()
        }
        
    } catch (e) {
        next(e)
    }

    
}

const getCountries = async (req,res)=>{
    

    // con Promise
    // const allCountries =  getDbInfo();
    // allCountries.then(r=>res.status(200).send(r))
    // .catch(e=>console.log(e))

    try {

        const allCountries = await getDbInfo();
       // console.log(allCountries)

       res.status(200).send(allCountries)    
        
    } catch (e) {
        console.log(e)
    }
    
    
    
};



const getCountryId = async (req,res) => {
    const { idPais }=req.params;
    let countriesTotal = await getDbInfo();
 
   try {
    
    if(idPais){
        let country =  countriesTotal.filter ( el => el.id.toLowerCase()==idPais.toLowerCase())
       // console.log(country);
        country?
        res.status(200).send(country):
        res.status(404).send('Hubo un error')
       
    } else{
        res.status(404).send('No se encontró el país, vuelva a intentar por favor')
    }


   } catch (e) {
       next(e)
   }
   

}



module.exports= {
   getCountries,
   getCountriesQuery,
   getCountryId
    }