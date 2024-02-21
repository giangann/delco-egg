import { getRepository } from 'typeorm';

// Entities
import { User } from '../../entities/user/user.entity';

// Utilities
import ApiUtility from '../../utilities/api.utility';
import DateTimeUtility from '../../utilities/date-time.utility';
import Encryption from '../../utilities/encryption.utility';

// Interfaces
import { IDetailById } from '../../interfaces/common.interface';
import {
  ILoginUser,
  IUpdateUser,
  IUserChangePasswordParams,
} from '../../interfaces/user.interface';

// Errors
import { StringError } from '../../errors/string.error';

const where = { isDeleted: false };

const login = async (params: ILoginUser) => {
  const user = await getRepository(User)
    .createQueryBuilder('user')
    .where('user.username = :username', { username: params.username })
    .select([
      'user.createdAt',
      'user.updatedAt',
      'user.id',
      'user.username',
      'user.password',
      'user.phone_number',
      'user.fullname',
      'user.company_name',
      'user.note',
      'user.isDeleted',
    ])
    .getOne();

  if (!user) {
    throw new StringError('Tên đăng nhập chưa được đăng ký');
  }

  if (await Encryption.verifyHash(params.password, user.password)) {
    return ApiUtility.sanitizeUser(user);
  }

  throw new StringError('Mật khẩu bạn đã nhập không đúng');
};

const listAdmin = async () => {
  const listAdmin = await getRepository(User).find({ isAdmin: true });
  return listAdmin;
};

const getById = async (params: IDetailById) => {
  try {
    const data = await getRepository(User).findOne({ id: params.id });
    return ApiUtility.sanitizeUser(data);
    return data;
  } catch (e) {
    return null;
  }
};

const detail = async (params: IDetailById) => {
  const query = {
    where: { ...where, id: params.id },
  };

  const user = await getRepository(User).findOne(query);
  if (!user) {
    throw new StringError('User is not existed');
  }

  return ApiUtility.sanitizeUser(user);
};

const update = async (params: IUpdateUser) => {
  const query = { ...where, id: params.id };

  const user = await getRepository(User).findOne(query);
  if (!user) {
    throw new StringError('User is not existed');
  }

  return await getRepository(User).update(query, {
    ...params,
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });
};

const detailWithPassword = async (params: { id: number }) => {
  const user = await getRepository(User)
    .createQueryBuilder('user')
    .where('id=:id', { id: params.id })
    .select([
      'user.createdAt',
      'user.updatedAt',
      'user.id',
      'user.username',
      'user.password',
      'user.phone_number',
      'user.fullname',
      'user.company_name',
      'user.note',
      'user.isDeleted',
    ])
    .getOne();

  return user;
};
const changePassword = async (params: IUserChangePasswordParams) => {
  const updatedRecord = await getRepository(User).update(
    { id: params.user_id },
    { password: params.new_password },
  );
  return updatedRecord;
};

export default {
  login,
  listAdmin,
  getById,
  detail,
  update,
  detailWithPassword,
  changePassword,
};
