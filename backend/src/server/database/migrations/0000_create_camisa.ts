import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable('camisa', table => {
            table.bigIncrements('id').primary().index();
            table.string('liga', 50).index().notNullable;
            table.string('selecao', 50).index().unique().notNullable;
            table.string('descricao', 20).notNullable;
            table.string('custo', 50).notNullable;
            table.string('imagem').notNullable;
        })
        .then(() => {
            console.log(`[# Server] Tabela camisa criada`)
        })
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable('camisa')
        .then(() => {
            console.log(`[# Server] tabela camisa apagada`)
        })
}