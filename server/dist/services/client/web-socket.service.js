"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendNotiToUser = async (user_id, order_id) => {
    const socketClients = await global.wsServerGlob.fetchSockets();
    socketClients.forEach((client) => {
        if (client.data.user?.id === user_id) {
            client.emit('newNoti', { order_id: order_id });
            client.emit('updateOrder', { order_id: order_id });
            client.emit('updateListOrder');
        }
    });
};
const sendNotiToListUser = async (params) => {
    params.forEach((param) => sendNotiToUser(param.user_id, param.order_id));
};
exports.default = { sendNotiToUser, sendNotiToListUser };
