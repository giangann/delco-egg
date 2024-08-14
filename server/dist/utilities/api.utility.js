"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiUtility {
    static getCookieFromRequest(req, key) {
        if (req.headers.authorization) {
            return req.headers.authorization;
        }
        if (req.headers.cookie) {
            const results = req.headers.cookie.split(';');
            const filtered = results.filter((result) => {
                return result.includes(`${key}=`);
            });
            if (filtered.length > 0) {
                return filtered[0].split('=')[1];
            }
        }
        return null;
    }
    static sanitizeData(data) {
        const { createdAt, updatedAt, ...basicData } = data;
        return basicData;
    }
    static sanitizeUser(user) {
        const { password, isDeleted, ...basicUser } = user;
        return basicUser;
    }
    static getQueryParam(req, type) {
        if (req && type && type !== '') {
            if (req.query[type] === 'undefined' || req.query[type] === 'null')
                return null;
            switch (type) {
                case 'limit': {
                    return req.query.limit
                        ? parseInt(req.query.limit.toString(), 10)
                        : null;
                }
                case 'page': {
                    return req.query.page
                        ? parseInt(req.query.page.toString(), 10)
                        : null;
                }
                default: {
                    return req.query[type] ? req.query[type] : null;
                }
            }
        }
        return null;
    }
    static getOffset(limit, page) {
        return limit * page - limit;
    }
    static getPagination(total, limit, currentPage) {
        if (total) {
            const pagination = {
                currentPage,
                totalPages: Math.ceil(total / limit),
                previousPage: currentPage <= 1 ? null : currentPage - 1,
                nextPage: total - currentPage * limit > 0 ? currentPage + 1 : null,
                totalItems: total,
            };
            return { pagination };
        }
        return { pagination: null };
    }
}
exports.default = ApiUtility;
