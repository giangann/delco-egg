"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const egg_price_qty_service_1 = __importDefault(require("../../services/admin/egg-price-qty.service"));
const api_response_utility_1 = __importDefault(require("../../utilities/api-response.utility"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const egg_price_qty_history_service_1 = __importDefault(require("../../services/admin/egg-price-qty-history.service"));
const date_time_utility_1 = __importDefault(require("../../utilities/date-time.utility"));
const list = async (req, res) => {
    try {
        const data = await egg_price_qty_service_1.default.list();
        return api_response_utility_1.default.result(res, data, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
const update = async (req, res) => {
    try {
        const params = {
            id: parseInt(req.params.id),
            ...req.body,
        };
        await egg_price_qty_service_1.default.update(params);
        return api_response_utility_1.default.result(res, params, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
const updateDayPrice = async (req, res) => {
    try {
        const newPrices = req.body;
        let newPriceParams = newPrices.map((price) => {
            return {
                egg_id: price.egg_id,
                price_1: price.price_1,
                price_2: price.price_2,
                price_3: price.price_3,
                quantity: price.quantity,
            };
        });
        const newPricesUpdated = await Promise.all(newPriceParams.map((params) => {
            return egg_price_qty_service_1.default.update(params);
        }));
        await updateHistoryTable(newPriceParams, date_time_utility_1.default.getCurrentDate());
        return api_response_utility_1.default.result(res, newPricesUpdated, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
const updateDayQuantity = async (req, res) => {
    try {
        let date = req.body.date;
        let newQtys = req.body.quantities;
        let currQtys = await egg_price_qty_service_1.default.list();
        let updateCurrTableRes = updateCurrentTable(newQtys, currQtys);
        await updateHistoryTable(newQtys, date);
        return api_response_utility_1.default.result(res, updateCurrTableRes, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
// helper function
async function updateCurrentTable(newQtys, currQtys) {
    const addQtys = findExcludeElements(currQtys, newQtys);
    const removeQtys = findExcludeElements(newQtys, currQtys);
    const updateQtys = findSameElements(currQtys, newQtys);
    // update egg_id that haved before
    if (updateQtys.length) {
        updateQtys.forEach(async (qty) => {
            let params = {
                egg_id: qty.egg_id,
                quantity: qty.quantity,
            };
            await egg_price_qty_service_1.default.update(params);
        });
    }
    // create new rows that egg_id don't have before
    if (addQtys.length) {
        addQtys.forEach(async (qty) => {
            let params = {
                egg_id: qty.egg_id,
                quantity: qty.quantity,
            };
            await egg_price_qty_service_1.default.create(params);
        });
    }
    // delete current rows that don't have in new data
    if (removeQtys.length) {
        removeQtys.forEach(async (qty) => {
            await egg_price_qty_service_1.default.remove({ egg_id: qty.egg_id });
        });
    }
    return {
        addQtys,
        removeQtys,
        updateQtys,
    };
}
async function updateHistoryTable(newPriceQtys, date) {
    const targetDateDatas = await egg_price_qty_history_service_1.default.list({
        date: date,
    });
    let createOrUpdateParams = newPriceQtys.map((row) => {
        return {
            egg_id: row.egg_id,
            date: date,
            price_1: row.price_1,
            price_2: row.price_2,
            price_3: row.price_3,
            quantity: row.quantity,
        };
    });
    if (targetDateDatas.length === 0) {
        for (let param of createOrUpdateParams) {
            await egg_price_qty_history_service_1.default.create(param);
        }
    }
    else {
        for (let param of createOrUpdateParams) {
            await egg_price_qty_history_service_1.default.update(param);
        }
    }
}
// return array that array1+array = array2
const findExcludeElements = (array1, array2) => {
    let result = [];
    array2.forEach((row2) => {
        const inArray2ButNotInArray1 = array1.every((row1) => row1.egg_id !== row2.egg_id);
        if (inArray2ButNotInArray1)
            result.push(row2);
    });
    return result;
};
// return array that array1+array = array2
const findSameElements = (array1, array2) => {
    let result = [];
    array2.forEach((row2) => {
        // if second .every method return true, it means
        // every row in array 1 don't have the egg_id same row2.egg_id
        // so in opposite, negative of this statement has meaning that
        // have at least 1 row in array 1 have the egg_id same row2.egg_id
        const inBothArray = !array1.every((row1) => row1.egg_id !== row2.egg_id);
        if (inBothArray)
            result.push(row2);
    });
    return result;
};
exports.default = { list, update, updateDayPrice, updateDayQuantity };
