import express from 'express'
import User from '../models/user.js'
const router = express.Router()

router.get('/', async(req,res)=>{
    try{
        const userID = req.session.userId
        const user = await User.findById(userID)
        const roleHistory = user.role.history
        const answerHistory = user.answer.historyScore
        answerHistory.sort((a,b)=>new Date(b.timestamp)- new Date(a.timestamp))
        roleHistory.sort((a,b)=>new Date(b.timestamp) - new Date(a.timestamp))
        res.render('testhome',{roleHistory,answerHistory})
    }catch(err){
        console.error(err.message||err)
        res.status(500).send('Internal Server Error')
    }
})

export default router