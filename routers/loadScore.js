import express from 'express'
import User from '../models/user.js'
const router = express.Router()

router.get('/', async(req,res)=>{
    try{
        const selectedTimestamp = req.query.timestamp
        const userID = req.session.userId
        const user = await User.findById(userID)
        const answerHistory = user.answer.historyScore

        const selectedAnswerScore = answerHistory.find(
            (history)=> history.timestamp.toISOString().slice(0,10)=== selectedTimestamp
        )
        if(!selectedAnswerScore){
            return res.status(404).json({error: 'Answer not found'})
        }
        res.json(selectedAnswerScore.Score)
    }catch(err){
        console.error('Error fetching answer : ',err.message )
        res.status(500).json({error: 'Internal Server Error'})
    }
})


export default router