/*
    Rutas de eventos / Event
    host+ /api/events
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { ValidarJWT } = require('../middlewares/validar-jwt');

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');


const router= Router();

//todas tienen que pasar por JWT


router.use(ValidarJWT);

//obtener evento


router.get(
    '/',
    getEventos
);

//crear un nuevo eventi
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','fecha de inicio es obligatoria').custom(isDate),
        check('end','fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento);

//actualizar evento
router.put('/:id', actualizarEvento);

//borrar evento

router.delete('/:id', eliminarEvento);



module.exports=router;