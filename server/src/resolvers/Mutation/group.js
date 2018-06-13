const { getUserId } = require('../../utils')

const group = {

  /** Creates a new group. Current user is auto-added to group */
  async createGroup(parent, args, ctx, info ) {
    const { title } = args
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

  async joinGroup(parent, args, ctx, info ) {
    const { id } = args
    return ctx.db.mutation.updateGroup({
      where: {
        id: id
      },
      data: {
        users: {
          connect: {
            id: getUserId(ctx),
          },
        },
      },
    }, info)
  },

  
}

module.exports = { group }
