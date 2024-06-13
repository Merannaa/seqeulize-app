import Post from "../../../DB/models/post.model.js"
import User from "../../../DB/models/user.model.js"

export const addPost = async(req,res)=>{
    try {
        //data title,content,author
    const {title,content,author}=req.body

    //insert post
    const post= await Post.create({
        title,
        content,
        author
    })
    res.json({messsage:'post created',post})
    } catch (error) {
        console.log(error);
        res.json({messsage:'internal server error'})
    }
    
}

export const getPosts=async(req,res)=>{
    try {
        let {count,rows} = await Post.findAndCountAll({
            include:{
                model:User,
                attributes:['name','email']
            }
        })
        res.json({message:'success', allPosts:count,Posts:rows})
    } catch (error) {
        console.log(error);
        res.json({message:'internal server error'}) 
    }
}

//Get a specific post with the author.
export const getPost=async(req,res)=>{
    try {
        const {id}=req.query
        const {title,content,author}=req.body
        let post = await Post.findOne({
            title,
            content,
            author,
            include:{
                model:User,
                as:"authorName",
                attributes:['name'],
                where:{
                    id:id
                }
            }
        })
        res.json({message:'success', post})
    } catch (error) {
        console.log(error);
        res.json({message:'internal server error'}) 
    }
}

export const updatePost= async(req,res)=>{
   try {
    const {title,content,author}=req.body
    const {id}=req.query
    const post = Post.update({
        where:{
            id:id,
            title:title,
            content:content,
            author:author
        }
    })
    if(post){
        res.json({messsage:'post updated',post})
    }else{
        res.json({messsage:'post not found'})
    }
    
   } catch (error) {
    console.log(error);
    res.json({messsage:'internal server error'})
   }
}
export const deletePost= async(req,res)=>{
    try {
     const {title,content,author}=req.body
     const {id}=req.query
     const post = Post.destroy({
         where:{
             id:id,
             title:title,
             content:content,
             author:author
         }
     })
     if(post){
     res.json({messsage:'post deleted',post})
     }else{
        res.json({messsage:'post not found'})
     }
    } catch (error) {
     console.log(error);
     res.json({messsage:'internal server error'})
    }
 }
