'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileSaverSchema extends Schema {
  up () {
    this.create('file_savers', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('file_savers')
  }
}

module.exports = FileSaverSchema
