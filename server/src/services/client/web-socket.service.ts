type RealTimeOrderNoti = {
  user_id: number;
  order_id: number;
};
const sendNotiToUser = async (user_id: number, order_id: number) => {
  const socketClients = await global.wsServerGlob.fetchSockets();

  socketClients.forEach((client) => {
    if (client.data.user.id === user_id) {
      client.emit('newNoti', { order_id: order_id });
      client.emit('updateOrder', { order_id: order_id });
      client.emit('updateListOrder');
    }
  });
};

const sendNotiToListUser = async (params: RealTimeOrderNoti[]) => {
  const sendPromise = Promise.all(
    params.map(async (param) => {
      await sendNotiToUser(param.user_id, param.order_id);
    }),
  );
  console.log(sendPromise);
};

export default { sendNotiToUser, sendNotiToListUser };
