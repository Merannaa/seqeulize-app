import { Router } from "express";
import * as commentController from './comment.controller.js'

const router=Router()

router.post('/add',commentController.addComment)
router.get('/getcomments',commentController.getComments)
router.get('/getcomment',commentController.getComment)
router.put('/update',commentController.updateComment)
router.delete('/delete',commentController.deleteComment)


export default router;