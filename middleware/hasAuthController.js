export default (req, res, next)=>{
    if(req.session.userId){
        return res.redirect('/home')
    }
    next()
}