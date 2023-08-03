const mongoose = require('mongoose')


const blogShcema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
})



const blog = mongoose.model('blog' , blogShcema)
module.exports.blog = blog