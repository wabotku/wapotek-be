exports.up = function (knex) {
   return knex.schema.createTable('products', (table) => {
     table.increments('id').primary();
     table.string('name').notNullable();
     table.text('description');
     table.decimal('price', 10, 2).notNullable();
     table.timestamps(true, true);
   });
 };
 
 exports.down = function (knex) {
   return knex.schema.dropTable('products');
 };
 