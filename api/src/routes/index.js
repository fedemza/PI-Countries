const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);




const Countries = require('./countries');
const Activity = require('./activity');

router.use('/countries', Countries)
router.use('/activity', Activity)



module.exports = router;
