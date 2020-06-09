import Knex from 'knex'

module.exports.up = async (knex: Knex) => {
    return knex.schema.createTable('collection_points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
    })
}

module.exports.down = async (knex: Knex) => {
    return knex.schema.dropTable('collection_points')
}