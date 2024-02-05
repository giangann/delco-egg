import { ICreateEgg, IUpdateEgg } from 'egg.interface';
import { Egg } from '../../entities/egg/egg.entity';
import { getRepository } from 'typeorm';
import { StringError } from '../../errors/string.error';
import DateTimeUtility from '../../utilities/date-time.utility';
import { IDeleteById } from 'common.interface';

const create = async (params: ICreateEgg) => {
  const egg = new Egg();
  egg.type_name = params.type_name;
  egg.weight = params.weight;
  const createEggData = await getRepository(Egg).save(egg);
  return createEggData;
};

const update = async (params: IUpdateEgg) => {
  const egg = getRepository(Egg).findOne({ id: params.id });
  if (!egg) {
    throw new StringError('Egg is not existed');
  }
  return await getRepository(Egg).update(
    { id: params.id },
    {
      type_name: params.type_name,
      weight: params.weight,
      updatedAt: DateTimeUtility.getCurrentTimeStamp(),
    },
  );
};

const list = async () => {
  return await getRepository(Egg).find();
};

const remove = async (params: IDeleteById) => {
  const query = { id: params.id };
  const egg = await getRepository(Egg).findOne(query);

  if (!egg) {
    throw new StringError('Egg is not existed');
  }
  return await getRepository(Egg).delete({ ...query });
};



export default {
  create,
  update,
  list,
  remove,
};
