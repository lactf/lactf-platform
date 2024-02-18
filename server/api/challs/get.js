import config from '../../config/server'
import * as challenges from '../../challenges'
import { responses } from '../../responses'
import { getChallengeInfo } from '../../cache/leaderboard'
import perms from '../../util/perms'

export default {
  method: 'GET',
  path: '/challs',
  requireAuth: true,
  handler: async ({ user }) => {
    if (Date.now() < config.startTime && !(user.perms & perms.challsRead)) {
      return responses.badNotStarted
    }

    const cleaned = challenges.getCleanedChallenges()
    const challengeInfo = await getChallengeInfo({
      ids: cleaned.map(chall => chall.id)
    })

    return [responses.goodChallenges, cleaned.map((chall, i) => ({
      ...chall,
      points: challengeInfo[i].score,
      solves: challengeInfo[i].solves
    }))]
  }
}
