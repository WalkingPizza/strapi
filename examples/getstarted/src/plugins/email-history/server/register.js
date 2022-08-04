'use strict';

module.exports = ({ strapi }) => {
  /** If the Strapi email plugin is not enabled, this plugin won't work. */
  if (!strapi.plugins.email) return;

  /** Override the send function to create a notification entry */
  strapi.plugin('email').service('email').send = (() => {
    const defaultSend = strapi.plugin('email').service('email').send;

    return async options => {
      await defaultSend(options);

      const { to, from, replyTo, subject } = options;

      const data = {
        recipient: to,
        subject,
        replyTo,
        sender: from,
        sentAt: new Date().toISOString(),
      };

      await strapi.entityService.create('plugin::email-history.notification', { data });
    };
  })();
};
