import { getRepository } from 'typeorm';
import { Egg } from '../../entities/egg/egg.entity';
const where = { isDeleted: false };

const list = async () => {
  return await getRepository(Egg).find();
};
const listNotDeleted = async () => {
  return await getRepository(Egg).find(where);
};

export default {
  list,
  listNotDeleted,
};
