import express from 'express'
import User from '../models/user.js'
import Answers from '../models/answerHistoryModel.js'
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const userID = req.session.userId
        const answers = await Answers.findById(userID)
        const answerHistory = answers.historyScore
        answerHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        res.render('history', { answerHistory })
    } catch (err) {
        console.error(err.message || err)
        res.status(500).send('Internal Server Error history page file')
    }
})


router.post('/api/answer-history', async (req, res) => {
    try {
        const userID = req.session.userId
        const user = await User.findById(userID)
        const answers = await Answers.findById(userID)
        const selectedTimestmap = req.body.timestamp
        const selectRole = user.roleHistory.history.find(history =>{
            return history.timestamp.toISOString().slice(0,10) === selectedTimestmap
        })
        const selectedScore = answers.historyScore.find(history =>{
            return history.timestamp.toISOString().slice(0,10) === selectedTimestmap
        })
        const asScore = {}
        const prpName = [
            'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7',
            'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7',
            'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7',
            'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7',
            'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7',
            'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7',
            'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7',
            'i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7',
            
        ]
        prpName.forEach(propName =>{
            asScore[propName] = selectedScore.Score[propName]
        })
        const asRole = {}
        const rolePropertyNames = ['IM', 'CO', 'SH', 'PL', 'RI', 'ME', 'TW', 'CF', 'SP']
        rolePropertyNames.forEach(roleName => {
            asRole[roleName] = selectRole.role[roleName];
        })
        res.json({asScore,asRole})
    } catch (err) {
        console.error(err.message || err)
        res.status(500).send('Internal Server Error history Controller file')
    }
})

export default router

