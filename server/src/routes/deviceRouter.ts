import { Router } from 'express'
const router = Router()
import DeviceController from '../controllers/deviceController'

router.post('/', DeviceController.create)
router.get('/', DeviceController.getAll)
router.get('/:id', DeviceController.getOne)

export default router