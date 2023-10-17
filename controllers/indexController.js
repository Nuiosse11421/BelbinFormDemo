export default (req,res)=>{
    res.render('index',{ user: req.session.user || null })
}