import mongoose from '../models/db.js';
import express from 'express';
import bcrypt from 'bcrypt'
import User from '../models/user.js';

const router = express.Router()

router.get('/' ,(req,res)=>{
    res.render('login',{ errorMessage: '', email: '',user: req.session.user})
})


router.post('/auth', async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await User.findOne({ email })
        if(!user){
            return res.render('login',{errorMessage: 'User not found.', email,user: req.session.user})
        }
        const passwordMt = await bcrypt.compare(password, user.password)
        if(passwordMt){
            req.session.userId ={
                _id: user._id,
                username: user.username,
                email: user.email,
            }
            res.redirect('/home')
        }else{
            res.render('login',{errorMessage:'Incorrect password',email,user: req.session.user})
        }
    }catch(err){
        console.error(err)
        res.render('login', {errorMessage: 'An error occurred.',email,user: req.session.user})
    }
})
router.get('/logout', (req,res)=>{
    req.session.user = indefined;
})

export default router