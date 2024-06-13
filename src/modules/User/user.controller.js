import {compareSync, hashSync} from "bcrypt"
import User from "../../../DB/models/user.model.js"
import Post from "../../../DB/models/post.model.js"

export const signup = async(req,res)=>{
try {
  //data.body name, email, password
const {name,email,password}=req.body

//check email exists or not
const isEmailExist = await User.findOne({
    where:{email}
})
if(isEmailExist){
    return res.json({message:'email is already exist'})
}
const cipher =hashSync(password,10)
console.log(cipher);
//insert data into table
const user = await User.create({
    name,
    email,
    password:cipher
})
res.json({message:'user created', user})  
} catch (error) {
    console.log(error);
    res.json({message:'internal server error'})
}
}
export const login = async(req,res)=>{
    //data.body email,password
    const {email,password}=req.body

    //hash password
    // const cipher = hashSync(password,10)

    //check user email is exist or not
    const isUserExist= await User.findOne(
        {
            where:{email}
        }
    )
    const isPasswordMatch =compareSync(password,isUserExist.password)
    console.log(isPasswordMatch);
    if(!isPasswordMatch){
        return res.json({message:'invalid credentials'})
    }
    
    res.json({message:'login successfully', username:isUserExist.name})
}

export const getUsers=async(req,res)=>{
    try {
        let {count,rows} = await User.findAndCountAll({
            include:{
                model:Post
            }
        })
        res.json({message:'success', allUsers:count,users:rows})
    } catch (error) {
        console.log(error);
        res.json({message:'internal server error'}) 
    }
    
}
//softDelete
export const softDeletePost= async(req,res)=>{
    try {
     const {id}=req.query
     const user = Post.findAll({
        paranoid:false,
         where:{
             id:{[Op.gt]:0}
         }
     })
     if(user){ 
        await user.destroy({force:false})
        res.json({messsage:'post deleted',user})
     }else{
        res.json({messsage:'post not found'})
     }
    } catch (error) {
     console.log(error);
     res.json({messsage:'internal server error'})
    }
 }
