const express = require('express')
const app = express();
const {blog} = require('./blog.model')

app.get('/' , (req,res) => {
   return  res.send("blog api integration ")
})

// Get all blog posts (Mandatory: Apply sorting based on created Date, blog name and filters based on category).
app.get('/posts' , (req,res) => {
        try {
            let search =  {}
            if(req.body.blogName){
                search.blogName = req.body.blogName
            }
            if(req.body.category){
                search.category = req.body.category
            }            
            if(req.body.createdDate){
                search.createdDate = req.body.createdDate
            }

            let data  = blog.aggregate([
                {
                    $match:search
                    
                },
            ])
            
            return res.json({
                status:200,
                data:data,
                message:"data successfully fetch"
            })

        } catch (error) {
            return res.json({
                status:500,
                data:{},
                message:error.message
            })
        }
})


// Get a specific blog post by ID.
app.get('/posts/:id' , async (req,res) => {    
    try {
        let data = await  blog.findOne({_id:req.input('id')})
        return res.json({
            status:200,
            data:data,
            message:"data successfully fetch"
        })

    } catch (error) {
        return res.json({
            status:500,
            data:{},
            message:error.message
        })
    }
})

// Create a new blog post
app.post('/posts' , async  (req,res) => {
    try {
        if(!req.body.title){
            return res.json({
                status:500,
                data:{},
                message:"please give title also"
        })
        }
        let  data  = new blog(req.body)
        await data.save();
        return res.json({
            status:200,
            data:data,
            message:"data successfully saved"
        })

    } catch (error) {
        return res.json({
            status:500,
            data:{},
            message:error.message
        })
    }
})

app.post('/deletePosts/:id' ,async  (req,res) => {
    try {
      
        let deleteuser  = await  blog.deleteOne({_id:req.input('id')})
        return res.json({
            status:200,
            data:{},
            message:"posts deleted successfully !"
        })
    } catch (error) {
        return res.json({
            status:500,
            data:{},
            message:error.message
        })
    }
})

app.post('/updatePosts/:id' , async (req,res) => {
    try {
      
        let {title , description } =  req.body;
        let data = {}
        
        if(title){
            data.title = title;
        }
        if(description){
            data.description = description;
        }
    
        let updateData =  await blog.updateOne({_id:req.input('id')} ,{$set:data})
        return res.json({
            status:200,
            data:{},
            message:"posts updated successfully !"
        })
    } catch (error) {
        return res.json({
            status:500,
            data:{},
            message:error.message
        })
    }


})
    




app.listen(8000 , () => {
    console.log("app is listening on port 8000 ! ")
})