exports.up = function (pgm) {
  pgm.addColumns('attempts', {
    createdat: { type: 'timestamp', notNull: true }
  })
}

exports.down = function (pgm) {
  pgm.dropColumns('attempts', ['createdat'])
}
