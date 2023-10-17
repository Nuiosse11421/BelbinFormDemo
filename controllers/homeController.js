import express from 'express'
import User from '../models/user.js'
const router = express.Router()



router.get('/', async (req, res) => {
    try {
        const userID = req.session.userId;
        const user = await User.findById(userID)
        const userRole = user.roles
        const roleHistory = user.roleHistory.history
        roleHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        const predefinedRoles = {
            IM: {
                name: 'Implementer',
                descripton: 'Needed to plan a workable strategy and carry it out as efficiently as possible.',
                Strengths: 'Practical, reliable, efficient. Turns ideas into actions and organises work that needs to be done.',
                weeknesses: 'Can be a bit inflexible and slow to respond to new possibilities.',
                surprised: 'They might be slow to relinquish their plans in favour of positive changes.',
            },
            CO: {
                name: 'Co-ordinator',
                descripton: "Needed to focus on the team's objectives, draw out team members and delegate work appropriately.",
                Strengths: 'Mature, confident, identifies talent. Clarifies goals',
                weeknesses: 'Can be seen as manipulative and might offload their own share of the work.',
                surprised: 'They might over-delegate, leaving themselves little work to do.',
            },
            SH: {
                name: 'Shaper',
                descripton: 'Provides the necessary drive to ensure that the team keeps moving and does not lose focus or momentum.',
                Strengths: 'Challenging, dynamic, thrives on pressure. Has the drive and courage to overcome obstacles.',
                weeknesses: "Can be prone to provocation, and may sometimes offend people's feelings.",
                surprised: 'They could risk becoming aggressive and bad-humoured in their attempts to get things done.',
            },
            PL: {
                name: 'Plant',
                descripton: 'Tends to be highly creative and good at solving problems in unconventional ways.',
                Strengths: 'Creative, imaginative, free-thinking, generates ideas and solves difficult problems.',
                weeknesses: 'Might ignore incidentals, and may be too preoccupied to communicate effectively.',
                surprised: 'They could be absent-minded or forgetful.',
            },
            RI: {
                name: 'Resource Investigator',
                descripton: 'Uses their inquisitive nature to find ideas to bring back to the team.',
                Strengths: 'Outgoing, enthusiastic. Explores opportunities and develops contacts.',
                weeknesses: 'Might be over-optimistic, and can lose interest once the initial enthusiasm has passed.',
                surprised: 'They might forget to follow up on a lead.',
            },
            ME: {
                name: 'Monitor Evaluator',
                descripton: "Provides a logical eye, making impartial judgements where required and weighs up the team's options in a dispassionate way.",
                Strengths: 'Sober, strategic and discerning. Sees all options and judges accurately.',
                weeknesses: 'Sometimes lacks the drive and ability to inspire others and can be overly critical.',
                surprised: 'They could be slow to come to decisions.',
            },
            TW: {
                name: 'Teamworker',
                descripton: 'Helps the team to gel, using their versatility to identify the work required and complete it on behalf of the team.',
                Strengths: 'Co-operative, perceptive and diplomatic. Listens and averts friction.',
                weeknesses: 'Can be indecisive in crunch situations and tends to avoid confrontation.',
                surprised: 'They might be hesitant to make unpopular decisions.',
            },
            CF: {
                name: 'Completer Finisher',
                descripton: 'Most effectively used at the end of tasks to polish and scrutinise the work for errors, subjecting it to the highest standards of quality control.',
                Strengths: 'Painstaking, conscientious, anxious. Searches out errors. Polishes and perfects.',
                weeknesses: 'Can be inclined to worry unduly, and reluctant to delegate.',
                surprised: 'They could be accused of taking their perfectionism to extremes.',
            },
            SP: {
                name: 'Specialist',
                descripton: 'Brings in-depth knowledge of a key area to the team.',
                Strengths: 'Single-minded, self-starting and dedicated. They provide specialist knowledge and skills.',
                weeknesses: 'Tends to contribute on a narrow front and can dwell on the technicalities.',
                surprised: 'They overload you with information.',
            },
        }
        res.render('home', { userRole, roleHistory, predefinedRoles })
    } catch (err) {
        console.error(err.message || err)
        res.status(500).send('Internal Server Error')
    }
})

router.get('/api/chart-data', async (req, res) => {
    try {
        const userID = req.session.userId
        const user = await User.findById(userID)
        const roleHistory = user.roleHistory.history
        const ChartData = roleHistory.map(entry => ({
            timestamp: entry.timestamp,
            roleData: entry.role,

        }))
        res.json(ChartData)
    } catch (err) {
        console.error(err.message || err)
        res.status(500).send('Internal Server Error')
    }
})


router.get('/api/answer-scores', async(req,res)=>{
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