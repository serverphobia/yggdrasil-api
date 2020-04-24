'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.createExtensionIfNotExists('uuid-ossp');
    this.create('users', (table) => {
      table.uuid('id').primary().defaultsTo(this.db.raw('uuid_generate_v4()'));
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamp('deleted_at').defaultsTo(null);
      table.timestamps()
    })
  }

  down () {
  }
}

module.exports = UserSchema
