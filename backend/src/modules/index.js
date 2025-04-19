import express from 'express'
import userRouter from './user/index.js'
import articleRouter from './article/index.js'

const router = express.Router()

router.use('/user', userRouter)
router.use('/article', articleRouter)


export default router