module.exports = {
  admin: {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/notifications',
        handler: 'notification.find',
      },
    ],
  },
};
