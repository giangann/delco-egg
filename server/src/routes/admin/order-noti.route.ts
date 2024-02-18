import express from 'express'
import orderNotiController from '../../controllers/admin/order-noti.controller'

const orderNotiRouter = express.Router()

orderNotiRouter.get('/', orderNotiController.list)
orderNotiRouter.put('/:id', orderNotiController.maskAsRead)

export default orderNotiRouter