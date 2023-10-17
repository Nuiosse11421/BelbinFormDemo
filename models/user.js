import mongoose from 'mongoose'

//define a schema for answer field


const HistoryRole = new mongoose.Schema({
    role:{
        IM: Number,
        CO: Number,
        SH: Number,
        PL: Number,
        RI: Number,
        ME: Number,
        TW: Number,
        CF: Number,
        SP: Number,
    },
    timestamp: Date,
},
    { _id: false }
)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roleHistory: {
        history: [HistoryRole],
    },
    roles:{
        IM: Number,
        CO: Number,
        SH: Number,
        PL: Number,
        RI: Number,
        ME: Number,
        TW: Number,
        CF: Number,
        SP: Number,
    }
    
})
const User = mongoose.model('User', userSchema)
export default User