
exports.up = function(knex) {
    return knex.schema.createTable('incidents',function(table){ //criando entidades
        table.increments(); //criando chave primaria auto incremental
        
        table.string('title').notNullable(); // criando atributo nome, não nulo
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable(); //relacionamento entre ongs e incidents

        table.foreign('ong_id').references('id').inTable('ongs'); //chave  estrangeira, que referencia 'id' na tabela 'ongs'
      });
};

exports.down = function(knex) {
    return knex.schema.droTable('incidentts');
};
