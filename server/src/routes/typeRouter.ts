import { Router } from 'express'
const router = Router()
import typeController from '../controllers/typeController'
import checkRole from '../middleware/checkRoleMiddleware'

router.post('/', checkRole('ADMIN'), typeController.create)
router.get('/', typeController.getAll)

export default router