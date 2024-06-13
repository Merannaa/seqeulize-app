import express from "express"
import { db_connection } from "./DB/connection.js"
import userRouter from "./src/modules/User/user.routes.js"
import postRouter from "./src/modules/Post/post.routes.js"
import commentRouter from "./src/modules/Comment/comment.routes.js"
import Post from "./DB/models/post.model.js";
import Comment from "./DB/models/comment.model.js";
import User from "./DB/models/user.model.js";



const app = express();
const port =8080;
app.use(express.json());
app.use('/user', userRouter)
app.use('/post',postRouter)
app.use('/comment',commentRouter)

db_connection();
User
Post
Comment
app.get("/",(req,res)=> res.send("hello"))
app.listen(port, () => console.log(`Example app listening on port ${port}`))