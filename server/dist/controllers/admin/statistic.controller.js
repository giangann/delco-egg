"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const application_1 = __importDefault(require("../../constants/application"));
const order_service_1 = __importDefault(require("../../services/admin/order.service"));
const api_response_utility_1 = __importDefault(require("../../utilities/api-response.utility"));
const api_utility_1 = __importDefault(require("../../utilities/api.utility"));
const egg_price_qty_history_service_1 = __importDefault(require("../../services/admin/egg-price-qty-history.service"));
const egg_service_1 = __importDefault(require("../../services/admin/egg.service"));
const todayOverview = async (req, res) => {
    try {
        let yesterday = req.query.yesterday;
        let orderListParams = {
            limit: Number(req.query.limit),
            page: Number(req.query.page),
            date: req.query.date,
            status: application_1.default.status.SUCCESS,
        };
        // get order today with success status
        const { response: todayOrderList } = await order_service_1.default.list(orderListParams);
        // get order yesterday with success status
        const { response: yesterdayOrderList } = await order_service_1.default.list({
            ...orderListParams,
            date: yesterday,
        });
        // return data: sum of total, sum of quantity, avg per unit
        let todayData = caculateRevenueByDate(todayOrderList);
        let yesterdayData = caculateRevenueByDate(yesterdayOrderList);
        let overViewData = {
            ...todayData,
            diffAvg: todayData.toDayAverage - yesterdayData.toDayAverage,
        };
        api_response_utility_1.default.result(res, overViewData, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, e);
    }
};
// helper function calculate yesterday Revenue
function caculateRevenueByDate(orderList) {
    // return data: sum of total, sum of quantity
    // calculate sum of total and sum of quantity
    let sumTotal = 0;
    let sumQty = 0;
    for (let order of orderList) {
        // sum of total
        let totalOfOrder = totalByOrderItems(order.items);
        sumTotal += totalOfOrder;
        // sum of quantity
        let totalOrderQty = quantityByOrderItems(order.items);
        sumQty += totalOrderQty;
    }
    let data = {
        sumTotal,
        sumQty,
        toDayAverage: Math.round(sumTotal / sumQty),
    };
    return data;
}
// helper function
function totalByOrderItems(orderItems) {
    let total = 0;
    for (let item of orderItems) {
        let totalOfItem = item.quantity * item.deal_price;
        total += totalOfItem;
    }
    return total;
}
// helper function
function quantityByOrderItems(orderItems) {
    let quantity = 0;
    for (let item of orderItems) {
        quantity += item.quantity;
    }
    return quantity;
}
const getEggPriceQtyHistory = async (req, res) => {
    try {
        let startDate = api_utility_1.default.getQueryParam(req, 'start_date');
        let endDate = api_utility_1.default.getQueryParam(req, 'end_date');
        let isDeleted = api_utility_1.default.getQueryParam(req, 'isDeleted');
        let historyTableData = await egg_price_qty_history_service_1.default.list({
            startDate,
            endDate,
        });
        // get eggs
        let params = {};
        if (isDeleted)
            params.isDeleted = isDeleted;
        let eggs = await egg_service_1.default.list(params);
        // calculate labels and datasets
        let labels = getDateLabels(historyTableData, 'DESC');
        // calculate datasets
        // datasets is array of object
        // each object have to 2 field: label and data[]
        // each elements of data array is number calculate from async helper function
        let datasetsPromise = eggs.map(async (egg) => {
            let dataPromise = labels.map(async (date) => {
                return await getEggPriceInDate(egg.id, date);
            });
            let data = await Promise.all(dataPromise);
            return { label: egg.type_name, data };
        });
        let datasets = await Promise.all(datasetsPromise);
        api_response_utility_1.default.result(res, { labels, datasets }, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
// helper function
async function getEggPriceInDate(egg_id, date) {
    let eggPricesInDate = await egg_price_qty_history_service_1.default.list({ date });
    for (let row of eggPricesInDate) {
        if (row.egg_id === egg_id) {
            return row.price_1;
        }
    }
    return null;
}
// helper function
function getDateLabels(data, sort) {
    let labels = [];
    for (let row of data) {
        if (!labels.includes(row.date)) {
            labels.push(row.date);
        }
    }
    if (sort === 'DESC')
        return labels.sort((a, b) => compareDate(a, b));
    // default is ascending, same with sort='ASC'
    labels.sort();
    return labels;
}
// helper function
function compareDate(date1, date2) {
    if (date1 >= date2)
        return -1;
    else
        return 1;
}
const getEggPriceQtyByDate = async (req, res) => {
    try {
        const date = api_utility_1.default.getQueryParam(req, 'date');
        const yesterday = api_utility_1.default.getQueryParam(req, 'yesterday');
        let data = await egg_price_qty_history_service_1.default.list({ date });
        let yesterdayData = await egg_price_qty_history_service_1.default.list({
            date: yesterday,
        });
        api_response_utility_1.default.result(res, data, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
// helper function
function comparePrice(todayPrice, yesterdayPrice) {
    let diffPrice;
    // loop throw each row of todayPrice and yesterdayPrice
    for (let iPrice of todayPrice) {
        for (let jPrice of yesterdayPrice) {
            if (iPrice.egg_id === jPrice.egg_id) {
                // compare 3 price of each type
                let diffP1 = iPrice.price_1 - jPrice.price_1;
                let diffP2 = jPrice.price_2 - jPrice.price_2;
                let diffP3 = jPrice.price_3 - jPrice.price_3;
                // diffPrice[`${iPrice.egg_id}` as any] = [diffP1, diffP2, diffP3];
            }
        }
    }
    for (let price of todayPrice) {
    }
}
exports.default = {
    todayOverview,
    getEggPriceQtyHistory,
    getEggPriceQtyByDate,
};
