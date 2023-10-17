import mongoose, { Mongoose } from 'mongoose';

mongoose.connect('mongodb+srv://admin:ima1@dbbel.ycv75wj.mongodb.net/BelbinRoleWeb?retryWrites=true&w=majority')
.then(()=>console.log('<| mongoose connect |> '))
.catch(()=>console.log('!!Cannot connect to server !!')) 

const db = mongoose.connection

export default mongoose