import db from './db'
import { Challenge } from '../challenges/types'
import { User } from './users'
import { ExtractQueryType } from './util'

export interface Attempt {
  id: string;
  challengeid: Challenge['id'];
  userid: User['id'];
  submission: string;
  createdat: Date;
}

export const getAllAttempts = (): Promise<Attempt[]> => {
  return db.query<Attempt>('SELECT * FROM attempts ORDER BY createdat ASC')
    .then(res => res.rows)
}

export const getAttemptsByUserId = ({ userid }: Pick<Attempt, 'userid'>): Promise<Attempt[]> => {
  return db.query<Attempt>('SELECT * FROM attempts WHERE userid = $1 ORDER BY createdat DESC', [userid])
    .then(res => res.rows)
}

export const getAttemptsByChallId = ({ challengeid, limit, offset }: Pick<Attempt, 'challengeid'> & { limit: number; offset: number; }): Promise<(Attempt & Pick<User, 'name'>)[]> => {
  return db.query<ExtractQueryType<typeof getAttemptsByChallId>>('SELECT attempts.id, attempts.userid, attempts.submissions, attempts.createdat, users.name FROM attempts INNER JOIN users ON attempts.userid = users.id WHERE attempts.challengeid=$1 ORDER BY attempts.createdat ASC LIMIT $2 OFFSET $3', [challengeid, limit, offset])
    .then(res => res.rows)
}

export const getAttemptByUserIdAndChallId = ({ userid, challengeid }: Pick<Attempt, 'userid' | 'challengeid'>): Promise<Attempt | undefined> => {
  return db.query<Attempt>('SELECT * FROM attempts WHERE userid = $1 AND challengeid = $2 ORDER BY createdat DESC', [userid, challengeid])
    .then(res => res.rows[0])
}

export const newAttempt = ({ id, userid, challengeid, submission, createdat }: Attempt): Promise<Attempt> => {
  return db.query<Attempt>('INSERT INTO attempts (id, challengeid, userid, submission, createdat) VALUES ($1, $2, $3, $4, $5) RETURNING *', [id, challengeid, userid, submission, createdat])
    .then(res => res.rows[0])
}

export const removeAttemptsByUserId = async ({ userid }: Pick<Attempt, 'userid'>): Promise<void> => {
  await db.query('DELETE FROM attempts WHERE userid = $1', [userid])
}
