import { Router } from "express";
import * as postController from './post.controller.js'

const router=Router()

router.post('/add',postController.addPost)
router.get('/getposts',postController.getPosts)
router.get('/getpost',postController.getPost)
router.put('/update',postController.updatePost)
router.delete('/delete',postController.deletePost)



export default router;