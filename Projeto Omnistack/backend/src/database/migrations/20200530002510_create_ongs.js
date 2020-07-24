
exports.up = function(knex) {
 return knex.schema.createTable('ongs',function(table){ //criando entidades
    table.string('id').primary(); //criando chave primaria
    table.string('name').notNullable(); // criando atributo nome, não nulo
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) { //npx knex migrate:rollback| desfaz a ultima migration feita
 return knex.schema.droTable('ongs');
};
