import Knex from 'knex'

module.exports.up = async (knex: Knex) => {
    return knex.schema.createTable('collection_points_items', table => {
        table.increments('id').primary(),
        table.integer('collection_point_id').notNullable().references('id').inTable('collection_points')
        table.integer('item_id').notNullable().references('id').inTable('items')
    })
}

module.exports.down = async (knex: Knex) => {
    return knex.schema.dropTable('collection_points_items')
}
