import { Router } from 'express'

import comments from '../controllers/comment.js'

const router = Router()

router.post('/addComment', comments.addComment)
router.get('/getComments', comments.getComments)

export default router