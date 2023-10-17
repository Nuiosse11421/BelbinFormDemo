import User from "../models/user.js";

export default (req,res,next)=>{
    User.findById(req.session.userId).then((user)=>{
        if(!user){return res.redirect('/')}
        next()
    }).catch(error =>{
        console.log(error)
    })
}