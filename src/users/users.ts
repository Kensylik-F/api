import express from 'express'


const useRouter = express.Router();


useRouter.post('/login', (req, res) =>{
    res.send('login')
})

useRouter.post('/regist', (req,res) =>{
    res.send('regist');
})

export {useRouter}