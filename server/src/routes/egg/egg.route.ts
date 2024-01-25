import express from 'express'
import eggControlelr from '../..//controllers/egg/egg.controlelr'
import { isAdmin } from '../..//middlewares/permission-handler.middleware'

const eggRouter = express.Router()

eggRouter.get('/',eggControlelr.list)
eggRouter.post('/',isAdmin(),eggControlelr.create)
eggRouter.put('/:id',isAdmin(),eggControlelr.update)
eggRouter.delete('/:id',isAdmin(),eggControlelr.remove)


export default eggRouter