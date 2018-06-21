const { getUserId } = require('../../utils')

const submission = {
// Creates a submission. User must be a member of the group
  async createSubmission(parent, args, ctx, info) {
    const { sessionId, songTitle, songArtist, link } = args

    const isMySession = await ctx.db.exists.Session({
      id: sessionId,
      group: {
        users_some: {
          id: getUserId(ctx)
        }
      }
    })

    // const submissions = await ctx.db.query.submissions({

    // })

    if(isMySession) {
      return ctx.db.mutation.createSubmission({
        data: {
          user: {
            connect: {
              id: getUserId(ctx)
            }
          },
          session: {
            connect: {
              id: sessionId
            },
          },
          songTitle,
          songArtist,
          link
        }
      }, info)
    }
  }
}
module.exports = { submission }