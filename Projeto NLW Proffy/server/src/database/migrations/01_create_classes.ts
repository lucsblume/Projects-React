import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();//Mátria
        table.decimal('cost').notNullable(); //custo hora/aula

        //RELACIONAMENTO
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
       
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('classes');
}