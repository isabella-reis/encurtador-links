// src/domain/short-links/get-original-url.ts
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'
import { makeLeft, makeRight, type Either } from '@/shared/either'

export async function getOriginalUrlByShortCode(
  shortCode: string
): Promise<Either<string, string>> {
  const result = await db
    .select({ originalUrl: schema.shortLinks.originalUrl })
    .from(schema.shortLinks)
    .where(eq(schema.shortLinks.shortCode, shortCode))
    .limit(1)

  if (result.length === 0) return makeLeft('Short code not found')

  return makeRight(result[0].originalUrl)
}