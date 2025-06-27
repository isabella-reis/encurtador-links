import { shortLinks } from "./shortLinks";


/**
 * Definição do esquema do banco de dados, incluindo as tabelas a serem usadas no ORM Drizzle.
 * 
 * @constant {Object} schema - Objeto que contém as definições das tabelas do banco de dados.
 * @property {import("./shortLinks").PgTable} shortLinks - Tabela de links definida no arquivo "shortLinks".
 */

export const schema = {
    shortLinks
}