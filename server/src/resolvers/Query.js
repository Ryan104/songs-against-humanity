const { getUserId } = require('../utils')

const Query = {
  /** All groups */
  groups(parent, args, ctx, info) {
    return ctx.db.query.groups({}, info)
  },

  /** All groups the current user belongs to */
  myGroups(parent, args, ctx, info) {
    return ctx.db.query.groups({
      where: {
        users_some: {
          id: getUserId(ctx),
        },
      },
    }, info)
  },

  /** Gets the active session for a group */
  async activeSession(parent, args, ctx, info) {
    const { groupId } = args

    const where = {
      group: {
        id: groupId,
      },
      expiration_gt: new Date(),
    }

    const sessions = await ctx.db.query.sessions({ where }, info)
    return sessions[0]
  },

  feed(parent, args, ctx, info) {
    return ctx.db.query.posts({ where: { isPublished: true } }, info)
  },

  drafts(parent, args, ctx, info) {
    const id = getUserId(ctx)

    const where = {
      isPublished: false,
      author: {
        id
      }
    }

    return ctx.db.query.posts({ where }, info)
  },

  post(parent, { id }, ctx, info) {
    return ctx.db.query.post({ where: { id } }, info)
  },

  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },
}

module.exports = { Query }
