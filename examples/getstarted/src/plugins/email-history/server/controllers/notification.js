module.exports = {
  find: async ctx => {
    return await strapi.entityService.findPage('plugin::email-history.notification', ctx.query);
  },
};
