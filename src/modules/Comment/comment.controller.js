import Comment from "../../../DB/models/comment.model.js"
import Post from "../../../DB/models/post.model.js"
import User from "../../../DB/models/user.model.js"
export const addComment = async(req,res)=>{
    try {
        //data content
    const {content}=req.body

    //insert comment
    const comment= await Comment.create({
        content
    })
    res.json({messsage:'comment created',comment})
    } catch (error) {
        console.log(error);
        res.json({messsage:'internal server error'})
    }
    
}

export const getComments=async(req,res)=>{
    try {
        let {count,rows} = await Comment.findAndCountAll({
            include:{
                model:User,
                attributes:['name']
            }
        })
        res.json({message:'success', allComments:count,Comments:rows})
    } catch (error) {
        console.log(error);
        res.json({message:'internal server error'}) 
    }
}

export const updateComment= async(req,res)=>{
   try {
    const {content}=req.body
    const {id}=req.query
    const comment = Comment.update(
        {
            content
        },
        {
        where:{
            id:id,
        }
    })
        res.json({messsage:'comment updated'})
   } catch (error) {
    console.log(error);
    res.json({messsage:'internal server error'})
   }
}
export const deleteComment= async(req,res)=>{
    try {
     const {content}=req.body
     const {id}=req.query
     const comment = Comment.destroy({
         where:{
             id:id,
             content:content
         }
     })
     if(comment){
     res.json({messsage:'comment deleted'})
     }else{
        res.json({messsage:'comment not found'})
     }
    } catch (error) {
     console.log(error);
     res.json({messsage:'internal server error'})
    }
 }

 //Special endpoint to get a specific user with a specific post and post’s comments.
 export const getComment=async(req,res)=>{
    try {
        const {id}=req.query
        let comment = await Comment.findOne({
            include:{
                model:Post,
                model:User,
                where:{
                    id:id
                }
            },
         
        })
        res.json({message:'success', comment})
    } catch (error) {
        console.log(error);
        res.json({message:'internal server error'}) 
    }
}