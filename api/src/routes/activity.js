const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');


const { postActivity } = require('../controllers/activity.controller');


const router = Router();




router.post('/', postActivity)

    



module.exports = router;