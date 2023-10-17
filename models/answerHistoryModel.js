import mongoose from 'mongoose'
const historyAnswer = new mongoose.Schema({
    Score: {
        a1: Number, a2: Number, a3: Number, a4: Number, a5: Number, a6: Number, a7: Number,
        b1: Number, b2: Number, b3: Number, b4: Number, b5: Number, b6: Number, b7: Number,
        c1: Number, c2: Number, c3: Number, c4: Number, c5: Number, c6: Number, c7: Number,
        d1: Number, d2: Number, d3: Number, d4: Number, d5: Number, d6: Number, d7: Number,
        e1: Number, e2: Number, e3: Number, e4: Number, e5: Number, e6: Number, e7: Number,
        f1: Number, f2: Number, f3: Number, f4: Number, f5: Number, f6: Number, f7: Number,
        g1: Number, g2: Number, g3: Number, g4: Number, g5: Number, g6: Number, g7: Number,
        h1: Number, h2: Number, h3: Number, h4: Number, h5: Number, h6: Number, h7: Number,
        i1: Number, i2: Number, i3: Number, i4: Number, i5: Number, i6: Number, i7: Number,
    },
    timestamp: Date,
},
    { _id: false }
)
const answers = new mongoose.Schema({
    _id: String,
    historyScore :[historyAnswer]
})

const Answers = mongoose.model('Answers', answers)

export default Answers

