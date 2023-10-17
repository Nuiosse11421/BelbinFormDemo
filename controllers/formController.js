import express from "express";
import User from "../models/user.js"
import Answers from "../models/answerHistoryModel.js";
const router = express.Router()




router.get('/', (req, res) => {
    res.render('form')
})

router.post('/sumit', async (req, res) => {
    const sectionData = []
    const roleSums = {
        IM: 0,
        CO: 0,
        SH: 0,
        PL: 0,
        RI: 0,
        ME: 0,
        TW: 0,
        CF: 0,
        SP: 0
    }


    for (let section = 1; section <= 7; section++) {
        let sectionValues = {}
        for (let letter = 'a'.charCodeAt(0); letter <= 'i'.charCodeAt(0); letter++) {
            const radioName = String.fromCharCode(letter) + section
            sectionValues[radioName] = parseInt(req.body[radioName] || 0, 10)
        }
        sectionData.push(sectionValues)
    }
    //calculate score average for role
    roleSums.IM += parseInt(req.body['h1'] || 0, 10) + parseInt(req.body['a2'] || 0, 10) + parseInt(req.body['i3'] || 0, 10) + parseInt(req.body['e4'] || 0, 10) + parseInt(req.body['b5'] || 0, 10) + parseInt(req.body['g6'] || 0, 10) + parseInt(req.body['e7'] || 0, 10)
    roleSums.CO += parseInt(req.body['d1'] || 0, 10) + parseInt(req.body['b2'] || 0, 10) + parseInt(req.body['a3'] || 0, 10) + parseInt(req.body['i4'] || 0, 10) + parseInt(req.body['f5'] || 0, 10) + parseInt(req.body['d6'] || 0, 10) + parseInt(req.body['g7'] || 0, 10)
    roleSums.SH += parseInt(req.body['g1'] || 0, 10) + parseInt(req.body['f2'] || 0, 10) + parseInt(req.body['c3'] || 0, 10) + parseInt(req.body['c4'] || 0, 10) + parseInt(req.body['d5'] || 0, 10) + parseInt(req.body['h6'] || 0, 10) + parseInt(req.body['a7'] || 0, 10)
    roleSums.PL += parseInt(req.body['c1'] || 0, 10) + parseInt(req.body['h2'] || 0, 10) + parseInt(req.body['d3'] || 0, 10) + parseInt(req.body['f4'] || 0, 10) + parseInt(req.body['h4'] || 0, 10) + parseInt(req.body['d6'] || 0, 10) + parseInt(req.body['f7'] || 0, 10)
    roleSums.RI += parseInt(req.body['a2'] || 0, 10) + parseInt(req.body['d2'] || 0, 10) + parseInt(req.body['f3'] || 0, 10) + parseInt(req.body['h4'] || 0, 10) + parseInt(req.body['e5'] || 0, 10) + parseInt(req.body['i6'] || 0, 10) + parseInt(req.body['d7'] || 0, 10)
    roleSums.ME += parseInt(req.body['i1'] || 0, 10) + parseInt(req.body['e2'] || 0, 10) + parseInt(req.body['h3'] || 0, 10) + parseInt(req.body['d4'] || 0, 10) + parseInt(req.body['a5'] || 0, 10) + parseInt(req.body['f6'] || 0, 10) + parseInt(req.body['b7'] || 0, 10)
    roleSums.TW += parseInt(req.body['b1'] || 0, 10) + parseInt(req.body['g2'] || 0, 10) + parseInt(req.body['e3'] || 0, 10) + parseInt(req.body['a4'] || 0, 10) + parseInt(req.body['c5'] || 0, 10) + parseInt(req.body['c6'] || 0, 10) + parseInt(req.body['i7'] || 0, 10)
    roleSums.CF += parseInt(req.body['e1'] || 0, 10) + parseInt(req.body['i2'] || 0, 10) + parseInt(req.body['b3'] || 0, 10) + parseInt(req.body['g4'] || 0, 10) + parseInt(req.body['g5'] || 0, 10) + parseInt(req.body['e6'] || 0, 10) + parseInt(req.body['c7'] || 0, 10)
    roleSums.SP += parseInt(req.body['f1'] || 0, 10) + parseInt(req.body['c2'] || 0, 10) + parseInt(req.body['g3'] || 0, 10) + parseInt(req.body['b4'] || 0, 10) + parseInt(req.body['i5'] || 0, 10) + parseInt(req.body['a6'] || 0, 10) + parseInt(req.body['h7'] || 0, 10)
    try {
        const userID = req.session.userId
        const user = await User.findById(userID)
        const answers = await Answers.findById(userID)
        if (answers) {
            answers.historyScore.push({
                Score: {
                    a1: parseInt(req.body['a1'] || 0, 10),
                    a2: parseInt(req.body['a2'] || 0, 10),
                    a3: parseInt(req.body['a3'] || 0, 10),
                    a4: parseInt(req.body['a4'] || 0, 10),
                    a5: parseInt(req.body['a5'] || 0, 10),
                    a6: parseInt(req.body['a6'] || 0, 10),
                    a7: parseInt(req.body['a7'] || 0, 10),
                    b1: parseInt(req.body['b1'] || 0, 10),
                    b2: parseInt(req.body['b2'] || 0, 10),
                    b3: parseInt(req.body['b3'] || 0, 10),
                    b4: parseInt(req.body['b4'] || 0, 10),
                    b5: parseInt(req.body['b5'] || 0, 10),
                    b6: parseInt(req.body['b6'] || 0, 10),
                    b7: parseInt(req.body['b7'] || 0, 10),
                    c1: parseInt(req.body['c1'] || 0, 10),
                    c2: parseInt(req.body['c2'] || 0, 10),
                    c3: parseInt(req.body['c3'] || 0, 10),
                    c4: parseInt(req.body['c4'] || 0, 10),
                    c5: parseInt(req.body['c5'] || 0, 10),
                    c6: parseInt(req.body['c6'] || 0, 10),
                    c7: parseInt(req.body['c7'] || 0, 10),
                    d1: parseInt(req.body['d1'] || 0, 10),
                    d2: parseInt(req.body['d2'] || 0, 10),
                    d3: parseInt(req.body['d3'] || 0, 10),
                    d4: parseInt(req.body['d4'] || 0, 10),
                    d5: parseInt(req.body['d5'] || 0, 10),
                    d6: parseInt(req.body['d6'] || 0, 10),
                    d7: parseInt(req.body['d7'] || 0, 10),
                    e1: parseInt(req.body['e1'] || 0, 10),
                    e2: parseInt(req.body['e2'] || 0, 10),
                    e3: parseInt(req.body['e3'] || 0, 10),
                    e4: parseInt(req.body['e4'] || 0, 10),
                    e5: parseInt(req.body['e5'] || 0, 10),
                    e6: parseInt(req.body['e6'] || 0, 10),
                    e7: parseInt(req.body['e7'] || 0, 10),
                    f1: parseInt(req.body['f1'] || 0, 10),
                    f2: parseInt(req.body['f2'] || 0, 10),
                    f3: parseInt(req.body['f3'] || 0, 10),
                    f4: parseInt(req.body['f4'] || 0, 10),
                    f5: parseInt(req.body['f5'] || 0, 10),
                    f6: parseInt(req.body['f6'] || 0, 10),
                    f7: parseInt(req.body['f7'] || 0, 10),
                    g1: parseInt(req.body['g1'] || 0, 10),
                    g2: parseInt(req.body['g2'] || 0, 10),
                    g3: parseInt(req.body['g3'] || 0, 10),
                    g4: parseInt(req.body['g4'] || 0, 10),
                    g5: parseInt(req.body['g5'] || 0, 10),
                    g6: parseInt(req.body['g6'] || 0, 10),
                    g7: parseInt(req.body['g7'] || 0, 10),
                    h1: parseInt(req.body['h1'] || 0, 10),
                    h2: parseInt(req.body['h2'] || 0, 10),
                    h3: parseInt(req.body['h3'] || 0, 10),
                    h4: parseInt(req.body['h4'] || 0, 10),
                    h5: parseInt(req.body['h5'] || 0, 10),
                    h6: parseInt(req.body['h6'] || 0, 10),
                    h7: parseInt(req.body['h7'] || 0, 10),
                    i1: parseInt(req.body['i1'] || 0, 10),
                    i2: parseInt(req.body['i2'] || 0, 10),
                    i3: parseInt(req.body['i3'] || 0, 10),
                    i4: parseInt(req.body['i4'] || 0, 10),
                    i5: parseInt(req.body['i5'] || 0, 10),
                    i6: parseInt(req.body['i6'] || 0, 10),
                    i7: parseInt(req.body['i7'] || 0, 10),
                },
                timestamp: new Date(),
            })
            await answers.save()
        } else {
            const newAnswer = new Answers({
                _id: userID,
                historyScore: [{
                    Score: {
                        a1: parseInt(req.body['a1'] || 0, 10),
                        a2: parseInt(req.body['a2'] || 0, 10),
                        a3: parseInt(req.body['a3'] || 0, 10),
                        a4: parseInt(req.body['a4'] || 0, 10),
                        a5: parseInt(req.body['a5'] || 0, 10),
                        a6: parseInt(req.body['a6'] || 0, 10),
                        a7: parseInt(req.body['a7'] || 0, 10),
                        b1: parseInt(req.body['b1'] || 0, 10),
                        b2: parseInt(req.body['b2'] || 0, 10),
                        b3: parseInt(req.body['b3'] || 0, 10),
                        b4: parseInt(req.body['b4'] || 0, 10),
                        b5: parseInt(req.body['b5'] || 0, 10),
                        b6: parseInt(req.body['b6'] || 0, 10),
                        b7: parseInt(req.body['b7'] || 0, 10),
                        c1: parseInt(req.body['c1'] || 0, 10),
                        c2: parseInt(req.body['c2'] || 0, 10),
                        c3: parseInt(req.body['c3'] || 0, 10),
                        c4: parseInt(req.body['c4'] || 0, 10),
                        c5: parseInt(req.body['c5'] || 0, 10),
                        c6: parseInt(req.body['c6'] || 0, 10),
                        c7: parseInt(req.body['c7'] || 0, 10),
                        d1: parseInt(req.body['d1'] || 0, 10),
                        d2: parseInt(req.body['d2'] || 0, 10),
                        d3: parseInt(req.body['d3'] || 0, 10),
                        d4: parseInt(req.body['d4'] || 0, 10),
                        d5: parseInt(req.body['d5'] || 0, 10),
                        d6: parseInt(req.body['d6'] || 0, 10),
                        d7: parseInt(req.body['d7'] || 0, 10),
                        e1: parseInt(req.body['e1'] || 0, 10),
                        e2: parseInt(req.body['e2'] || 0, 10),
                        e3: parseInt(req.body['e3'] || 0, 10),
                        e4: parseInt(req.body['e4'] || 0, 10),
                        e5: parseInt(req.body['e5'] || 0, 10),
                        e6: parseInt(req.body['e6'] || 0, 10),
                        e7: parseInt(req.body['e7'] || 0, 10),
                        f1: parseInt(req.body['f1'] || 0, 10),
                        f2: parseInt(req.body['f2'] || 0, 10),
                        f3: parseInt(req.body['f3'] || 0, 10),
                        f4: parseInt(req.body['f4'] || 0, 10),
                        f5: parseInt(req.body['f5'] || 0, 10),
                        f6: parseInt(req.body['f6'] || 0, 10),
                        f7: parseInt(req.body['f7'] || 0, 10),
                        g1: parseInt(req.body['g1'] || 0, 10),
                        g2: parseInt(req.body['g2'] || 0, 10),
                        g3: parseInt(req.body['g3'] || 0, 10),
                        g4: parseInt(req.body['g4'] || 0, 10),
                        g5: parseInt(req.body['g5'] || 0, 10),
                        g6: parseInt(req.body['g6'] || 0, 10),
                        g7: parseInt(req.body['g7'] || 0, 10),
                        h1: parseInt(req.body['h1'] || 0, 10),
                        h2: parseInt(req.body['h2'] || 0, 10),
                        h3: parseInt(req.body['h3'] || 0, 10),
                        h4: parseInt(req.body['h4'] || 0, 10),
                        h5: parseInt(req.body['h5'] || 0, 10),
                        h6: parseInt(req.body['h6'] || 0, 10),
                        h7: parseInt(req.body['h7'] || 0, 10),
                        i1: parseInt(req.body['i1'] || 0, 10),
                        i2: parseInt(req.body['i2'] || 0, 10),
                        i3: parseInt(req.body['i3'] || 0, 10),
                        i4: parseInt(req.body['i4'] || 0, 10),
                        i5: parseInt(req.body['i5'] || 0, 10),
                        i6: parseInt(req.body['i6'] || 0, 10),
                        i7: parseInt(req.body['i7'] || 0, 10),
                    },
                    timestamp: new Date(),
                }]
            })
            newAnswer.save()
        }
        user.roles = {
            IM: roleSums.IM,
            CO: roleSums.CO,
            SH: roleSums.SH,
            PL: roleSums.PL,
            RI: roleSums.RI,
            ME: roleSums.ME,
            TW: roleSums.TW,
            CF: roleSums.CF,
            SP: roleSums.SP,
        }
        const minValue = 0
        const maxValue = 100
        for (const role in roleSums) {
            if (roleSums.hasOwnProperty(role)) {
                const value = roleSums[role]
                if (value < minValue || value > maxValue) {
                    return res.status(400).send('Invalid &{rold} value')
                }
            }
        }

        user.roleHistory.history.push({
            role: {
                IM: roleSums.IM,
                CO: roleSums.CO,
                SH: roleSums.SH,
                PL: roleSums.PL,
                RI: roleSums.RI,
                ME: roleSums.ME,
                TW: roleSums.TW,
                CF: roleSums.CF,
                SP: roleSums.SP,
            },
            timestamp: new Date,
        })
        await user.save()
        res.redirect('/home')
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
})

export default router