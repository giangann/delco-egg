'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step(
        (generator = generator.apply(thisArg, _arguments || [])).next(),
      );
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const typeorm_1 = require('typeorm');
// Entities
const user_entity_1 = require('../../entities/user/user.entity');
// Utilities
const encryption_utility_1 = __importDefault(
  require('../../utilities/encryption.utility'),
);
const api_utility_1 = __importDefault(
  require('../../utilities/api.utility'),
);
const date_time_utility_1 = __importDefault(
  require('../../utilities/date-time.utility'),
);
// Errors
const string_error_1 = require('../../errors/string.error');
const where = { isDeleted: false };
const create = (params) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const item = new user_entity_1.User();
    item.password = yield encryption_utility_1.default.generateHash(
      params.password,
      10,
    );
    const userData = yield typeorm_1
      .getRepository(user_entity_1.User)
      .save(Object.assign(Object.assign({}, params), item));
    return api_utility_1.default.sanitizeUser(userData);
  });
const login = (params) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield typeorm_1
      .getRepository(user_entity_1.User)
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
      throw new string_error_1.StringError(
        'Tên đăng nhập chưa được đăng ký',
      );
    }
    if (
      yield encryption_utility_1.default.verifyHash(
        params.password,
        user.password,
      )
    ) {
      return api_utility_1.default.sanitizeUser(user);
    }
    throw new string_error_1.StringError(
      'Mật khẩu bạn đã nhập không đúng',
    );
  });
const getById = (params) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const data = yield typeorm_1
        .getRepository(user_entity_1.User)
        .findOne({ id: params.id });
      return api_utility_1.default.sanitizeUser(data);
    } catch (e) {
      return null;
    }
  });
const detail = (params) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const query = {
      where: Object.assign(Object.assign({}, where), { id: params.id }),
    };
    const user = yield typeorm_1
      .getRepository(user_entity_1.User)
      .findOne(query);
    if (!user) {
      throw new string_error_1.StringError('User is not existed');
    }
    return api_utility_1.default.sanitizeUser(user);
  });
const update = (params) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const query = Object.assign(Object.assign({}, where), {
      id: params.id,
    });
    const user = yield typeorm_1
      .getRepository(user_entity_1.User)
      .findOne(query);
    if (!user) {
      throw new string_error_1.StringError('User is not existed');
    }
    return yield typeorm_1.getRepository(user_entity_1.User).update(
      query,
      Object.assign(Object.assign({}, params), {
        updatedAt: date_time_utility_1.default.getCurrentTimeStamp(),
      }),
    );
  });
const list = (params) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let userRepo = typeorm_1
      .getRepository(user_entity_1.User)
      .createQueryBuilder('user');
    userRepo = userRepo.where('user.isDeleted = :isDeleted', {
      isDeleted: false,
    });
    if (params.username) {
      userRepo.andWhere(
        '(LOWER(user.username) LIKE LOWER(:username))',
        {
          username: `%${params.username}%`,
        },
      );
    }
    if (params.company_name) {
      userRepo.andWhere(
        '(LOWER(user.company_name) LIKE LOWER(:company_name))',
        { company_name: `%${params.company_name}%` },
      );
    }
    if (params.fullname) {
      userRepo.andWhere(
        '(LOWER(user.fullname) LIKE LOWER(:fullname))',
        {
          fullname: `%${params.fullname}%`,
        },
      );
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
    const total = yield paginationRepo.getMany();
    const pagRes = api_utility_1.default.getPagination(
      total.length,
      params.limit,
      params.page,
    );
    userRepo = userRepo
      .limit(params.limit)
      .offset(
        api_utility_1.default.getOffset(params.limit, params.page),
      );
    const users = yield userRepo.getMany();
    const response = [];
    if (users && users.length) {
      for (const item of users) {
        response.push(api_utility_1.default.sanitizeUser(item));
      }
    }
    return { response, pagination: pagRes.pagination };
  });
const remove = (params) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const query = Object.assign(Object.assign({}, where), {
      id: params.id,
    });
    const user = yield typeorm_1
      .getRepository(user_entity_1.User)
      .findOne(query);
    if (!user) {
      throw new string_error_1.StringError('User is not existed');
    }
    return yield typeorm_1
      .getRepository(user_entity_1.User)
      .update(query, {
        isDeleted: true,
        updatedAt: date_time_utility_1.default.getCurrentTimeStamp(),
      });
  });
exports.default = {
  create,
  login,
  getById,
  detail,
  update,
  list,
  remove,
};
