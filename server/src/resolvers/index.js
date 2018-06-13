const { Query } = require('./Query')
const { Subscription } = require('./Subscription')
const { auth } = require('./Mutation/auth')
const { post } = require('./Mutation/post')
const { group } = require('./Mutation/group')
const { session } = require('./Mutation/session')
const { AuthPayload } = require('./AuthPayload')

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...post,
    ...group,
    ...session,
  },
  Subscription,
  AuthPayload,
}
