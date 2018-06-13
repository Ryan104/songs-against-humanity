const { getUserId } = require('../../utils')

const session = {

  /** Creates a session. User must be a member of the given group */
  async createSession(parent, args, ctx, info) {
    const { groupId, genre } = args

    const groups = await ctx.db.query.groups({
      where: {
        id: groupId,
        users_some: {
          id: getUserId(ctx),
        },
      },
    }, '{ id sessions { id expiration } }')

    if (groups.length === 0) {
      throw new Error('You must join this group to create a session')
    }

    // check for active session
    const activeSessions = groups[0].sessions.filter(session => {
      const expires = (new Date(session.expiration)).getTime()
      const now = Date.now()
      return expires > now
    })

    if (activeSessions.length > 0) {
      throw new Error('There is alreay an active session!')
    }

    const expiration = new Date(Date.now() + 86400000) // plus 24 hours

    return ctx.db.mutation.createSession({
      data: {
        group: {
          connect: {
            id: groupId,
          },
        },
        genre,
        expiration,
      }
    }, info)
  }
}

module.exports = { session }
