// src/domain/short-links/delete-short-link.ts
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'
import { makeLeft, makeRight, type Either } from '@/shared/either'

export async function deleteShortLinkById(
  id: string
): Promise<Either<string, { deleted: boolean }>> {
  const deleted = await db
    .delete(schema.shortLinks)
    .where(eq(schema.shortLinks.id, id))
    .returning()

  if (deleted.length === 0) {
    return makeLeft('Link não encontrado')
  }

  return makeRight({ deleted: true })
}