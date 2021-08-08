/*
    Rutas de usuarios / Auth
    host+ /api/auth
*/

const {Router} = require('express');
const { check } = require('express-validator');
const router= Router();

const { crearUsuario, loginUsuario, revalidarToken }= require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { ValidarJWT } = require('../middlewares/validar-jwt');


router.post(
    '/new', 
    [//middlewares
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    crearUsuario
);

router.post(
    '/',
    [//middlewares
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    loginUsuario);

router.get('/renew',[ValidarJWT],revalidarToken );

module.exports=router;