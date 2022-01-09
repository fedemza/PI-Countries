const { Country, Activity} = require ('../db');


const postActivity = async (req,res,next) => {
    const {name, difficulty, duration, season, countries} = req.body;
    console.log();
  try {

    let activityCreated = await Activity.findOrCreate({
      where:{
        name,
        difficulty, 
        duration, 
        season,
    }

      }  
    )
    let countriesDb = await Country.findAll({
      where: { name: countries}
  })   

  const activ = await Activity.findOne({
    where: {
      name: name,
    },
  });

  await activ.addCountry(countriesDb)

  res.send('actividad creada')
    
  } catch (e) {
   next(e) 
  }
   
}
module.exports= { postActivity }