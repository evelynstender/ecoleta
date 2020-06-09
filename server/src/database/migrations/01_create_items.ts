import Knex from 'knex'

module.exports.up = async (knex: Knex) => {
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('image').notNullable();
    })
}

module.exports.down = async (knex: Knex) => {
    return knex.schema.dropTable('items')
}