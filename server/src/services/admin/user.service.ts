import { getRepository } from 'typeorm';

// Entities
import { User } from '../../entities/user/user.entity';

// Utilities
import Encryption from '../../utilities/encryption.utility';
import ApiUtility from '../../utilities/api.utility';
import DateTimeUtility from '../../utilities/date-time.utility';

// Interfaces
import {
  ICreateUser,
  ILoginUser,
  IUpdateUser,
  IUserQueryParams,
} from '../../interfaces/user.interface';
import {
  IDeleteById,
  IDetailById,
} from '../../interfaces/common.interface';

// Errors
import { StringError } from '../../errors/string.error';

const where = { isDeleted: false };

const create = async (params: ICreateUser) => {
  const item = new User();
  item.password = await Encryption.generateHash(params.password, 10);

  const userData = await getRepository(User).save({
    ...params,
    ...item,
  });
  return ApiUtility.sanitizeUser(userData);
};

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

const getById = async (params: IDetailById) => {
  try {
    const data = await getRepository(User).findOne({ id: params.id });
    return ApiUtility.sanitizeUser(data);
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

const list = async (params: IUserQueryParams) => {
  let userRepo = getRepository(User).createQueryBuilder('user');
  userRepo = userRepo.where('user.isDeleted = :isDeleted', {
    isDeleted: false,
  });

  if (params.username) {
    userRepo.andWhere('(LOWER(user.username) LIKE LOWER(:username))', {
      username: `%${params.username}%`,
    });
  }
  if (params.company_name) {
    userRepo.andWhere(
      '(LOWER(user.company_name) LIKE LOWER(:company_name))',
      { company_name: `%${params.company_name}%` },
    );
  }
  if (params.fullname) {
    userRepo.andWhere('(LOWER(user.fullname) LIKE LOWER(:fullname))', {
      fullname: `%${params.fullname}%`,
    });
  }
  if (params.phone_number) {
    userRepo.andWhere(
      '(LOWER(user.phone_number) LIKE LOWER(:phone_number))',
      {
        phone_number: `%${params.phone_number}%`,
      },
    );
  }
  if (params.isAdmin) {
    userRepo.andWhere('user.isAdmin = :isAdmin', {
      isAdmin: params.isAdmin,
    });
  }

  // Pagination
  const paginationRepo = userRepo;
  const total = await paginationRepo.getMany();
  const pagRes = ApiUtility.getPagination(
    total.length,
    params.limit,
    params.page,
  );

  userRepo = userRepo
    .limit(params.limit)
    .offset(ApiUtility.getOffset(params.limit, params.page));
  const users = await userRepo.getMany();

  const response = [];
  if (users && users.length) {
    for (const item of users) {
      response.push(ApiUtility.sanitizeUser(item));
    }
  }
  return { response, pagination: pagRes.pagination };
};

const remove = async (params: IDeleteById) => {
  const query = { ...where, id: params.id };

  const user = await getRepository(User).findOne(query);
  if (!user) {
    throw new StringError('User is not existed');
  }

  return await getRepository(User).update(query, {
    isDeleted: true,
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });
};

export default {
  create,
  login,
  getById,
  detail,
  update,
  list,
  remove,
};
