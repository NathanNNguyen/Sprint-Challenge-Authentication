const db = require('./dbConfig.js');

module.exports = {
  findById,
  add,
  findBy,
  // getAll
};

function findById(id) {
  return db('users').where({ id }).select('id', 'username').first()
};

function findBy(filter) {
  return db('users').where(filter).first();
};

function add(data) {
  return db('users').insert(data)
    .then(arr => {
      return findById(arr[0])
    });
};

// function getAll() {
//   return db('users');
// };