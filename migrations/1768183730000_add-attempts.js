exports.up = function (pgm) {
  pgm.createTable('attempts', {
    id: { type: 'uuid', primaryKey: true },
    challengeid: { type: 'string', notNull: true },
    userid: { type: 'uuid', notNull: true },
    submission: { type: 'string', notNull: true },
    createdat: { type: 'timestamp', notNull: true }
  })
}

exports.down = function (pgm) {
  pgm.dropTable('attempts')
}
