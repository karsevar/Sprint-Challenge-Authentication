
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'alice',
        password:
         '$2a$14$IafFsXZzFr89BRTZ771N5e0OqESUzk.ZIhp5VRPgIWxBMa0JGxK5a' },
      { username: 'mason',
        password:
         '$2a$14$hpRns6ipWIT88ondglrk2uCTkgoemgCP/ylziX15ORqQqYeJQZ4Q.' }
      ]);
    });
};
