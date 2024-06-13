import { Router } from "express";
import * as userController from './user.controller.js'
const router=Router()

router.post('/register',userController.signup)
router.post('/login',userController.login)
router.get('/getusers',userController.getUsers)
router.put('/softdelete',userController.softDeletePost)

export default router;