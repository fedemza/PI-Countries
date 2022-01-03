const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');


const { getCountries, getCountriesQuery, getCountryId } = require('../controllers/countries.controller');


const router = Router();




router.get('/', getCountriesQuery)
router.get('/', getCountries)
router.get('/:idPais', getCountryId)

    



module.exports = router;