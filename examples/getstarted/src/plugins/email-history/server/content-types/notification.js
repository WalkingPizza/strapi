module.exports = {
  kind: 'collectionType',
  collectionName: 'notifications',
  info: {
    singularName: 'notification',
    pluralName: 'notifications',
    displayName: 'Notifications',
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {
    'content-manager': {
      visible: true,
    },
    'content-type-builder': {
      visible: false,
    },
  },
  attributes: {
    recipient: {
      type: 'string',
    },
    subject: {
      type: 'string',
    },
    sender: {
      type: 'string',
    },
    replyTo: {
      type: 'string',
    },
    sentAt: {
      type: 'datetime',
    },
  },
};
