const Router = require('express');
const router = new Router()


router.get('/3',(req,res)=>res.json('Привет13'))
router.post('/2',(req,res)=>res.json('Привет?'))
router.post('/1',(req,res)=>res.json('Привет!'))

module.exports = router