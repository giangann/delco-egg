import express from 'express';
import eggControlelr from '../../controllers/admin/egg.controlelr';

const eggRouter = express.Router();

eggRouter.get('/', eggControlelr.list);
eggRouter.post('/', eggControlelr.create);
eggRouter.put('/:id', eggControlelr.update);
eggRouter.delete('/:id', eggControlelr.remove);

export default eggRouter;
