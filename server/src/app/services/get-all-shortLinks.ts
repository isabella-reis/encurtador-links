// src/domain/short-links/get-all-short-links.ts
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { makeRight, type Either } from '@/shared/either'

export async function getAllShortLinks(): Promise<Either<never, typeof schema.shortLinks.$inferSelect[]>> {
  const result = await db.select().from(schema.shortLinks)
  return makeRight(result)
}
