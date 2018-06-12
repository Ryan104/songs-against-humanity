const { getUserId } = require('../../utils')

const group = {

  /** Creates a new group. Current user is auto-added to group */
  async createGroup(parent, { title }, ctx, info ) {
    return ctx.db.mutation.createGroup({
      data: {
        title,
        users: { // add current user to the group
          connect: {
            id: getUserId(ctx),
          },
        },
      },
    }, info)
  },
}

module.exports = { group }
