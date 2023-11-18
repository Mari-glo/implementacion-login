const { Router } = require ('express')
const { userModel } = require('../Daos/Mongo/models/user.model.js')


const router = Router()


router.post('/login', async (req, res) =>{
    const {email, password} = req.body
    const user = await userModel.findOne({email, password})
    if(!user) return res.status(401).send({status: 'error', error: 'usuario o contraseña incorrecto'})
    req.session.user={
    name:`${user.first_name} ${user.last_name}`,
    email: user.email
}
res.status(200).send({
    status: 'ok!',
    payload: req.session.user,
    message: 'logeado correctamente'
})

})
router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body
    if (!first_name||!email||!password) {
        return res.send({status: 'error', error: 'completar los campos requeridos'})
    }
    const existe = await userModel.findOne({email})
    if (existe) return res.status(401).send({status:'error', error: 'el mail ingresado ya fue registrado'})
    const newUser = {
    first_name, last_name, email, password
    }
    let result = await userModel.create(newUser)

    res.send({status:'ok!', message: 'el usuario fue registrado correctamente'})
        
    } catch (error) {
        console.log(error)
        
    }
    
})
router.post('/logout', (req, res) =>{
    res.send('cerrada la sesión')
})

module.exports = router