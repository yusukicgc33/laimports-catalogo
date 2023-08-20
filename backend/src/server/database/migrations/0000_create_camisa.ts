import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable('camisa', table => {
            table.bigIncrements('id').primary().index();
            table.string('liga').index().notNullable;
            table.string('selecao').index().unique().notNullable;
            table.string('descricao').notNullable;
            table.string('custo').notNullable;
            table.text('imagem').notNullable;
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