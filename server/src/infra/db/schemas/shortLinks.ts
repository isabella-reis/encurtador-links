import { uuidv7 } from "uuidv7"
import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core"

/**
 * Definição da tabela "short_links" no banco de dados.
 * 
 * @property {string} id - Identificador único do link.
 * @property {string} shortCode - Código único gerado para representar a URL encurtada.
 * @property {string} originalUrl - A URL original fornecida pelo usuário.
 * @property {number} hits - Quantidade de vezes que esse link foi acessado.
 * @property {Date} createdAt - Data de criação do link.
 */
export const shortLinks = pgTable("short_links", {
  id: text("id").primaryKey().$defaultFn(() => uuidv7()),
  shortCode: text("short_code").notNull().unique(), // ex: "brev.ly/abc123"
  originalUrl: text("original_url").notNull(),
  hits: integer("hits").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
