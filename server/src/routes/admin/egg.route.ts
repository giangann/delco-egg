import express from 'express';
import eggController from '../../controllers/admin/egg.controller';

const eggRouter = express.Router();

eggRouter.get('/', eggController.list);
eggRouter.post('/', eggController.create);
eggRouter.put('/:id', eggController.update);
eggRouter.delete('/:id', eggController.remove);

export default eggRouter;
