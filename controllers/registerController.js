import express from 'express'
const router = express.Router()
import mongoose from 'mongoose'
import User from '../models/user.js'
import Answers from '../models/answerHistoryModel.js'
import bcrypt from 'bcrypt'

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/create', async (req, res) => {
    const { username, email, password } = req.body

    try {
        const existingUser = await User.findOne({ email})
        if(existingUser){
            return res.status(400).redirect('/register')
        }
        const hashPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            username,
            email, 
            password : hashPassword,
        })
        await newUser.save()
        res.redirect(('/login'))
    } catch (err) {
        console.error(err)
        res.status(500).redirect('/register')
    }
})

export default router