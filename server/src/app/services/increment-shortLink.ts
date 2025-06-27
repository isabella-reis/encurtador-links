// src/domain/short-links/increment-short-link-hit.ts
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'
import { makeLeft, makeRight, type Either } from '@/shared/either'

export async function incrementShortLinkHit(
  shortCode: string
): Promise<Either<string, null>> {
  const link = await db
    .select()
    .from(schema.shortLinks)
    .where(eq(schema.shortLinks.shortCode, shortCode))
    .limit(1)

  if (link.length === 0) {
    return makeLeft('Short link não encontrado')
  }

  await db
    .update(schema.shortLinks)
    .set({ hits: link[0].hits + 1 })
    .where(eq(schema.shortLinks.id, link[0].id))

  return makeRight(null)
}