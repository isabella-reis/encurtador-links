import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { makeLeft, makeRight, type Either } from '@/shared/either'
import { stringify } from 'csv-stringify/sync'
import { Upload } from '@aws-sdk/lib-storage'
import { r2 } from '@/infra/storage/client'
import { randomUUID } from 'node:crypto'
import { env } from "../../env";

export async function exportShortLinksToCsv(): Promise<Either<string, { key: string; url: string }>> {
  const shortLinks = await db.select().from(schema.shortLinks)

  if (shortLinks.length === 0) {
    return makeLeft('Nenhum link encontrado para exportar.')
  }

  const records = shortLinks.map((link) => ({
    originalUrl: link.originalUrl,
    shortUrl: new URL(link.shortCode, env.SHORT_LINK_DOMAIN).toString(),
    hits: link.hits,
    createdAt: link.createdAt.toISOString(),
  }))

  const csvContent = stringify(records, {
    header: true,
    columns: ['originalUrl', 'shortUrl', 'hits', 'createdAt'],
  })

  const uniqueFileName = `exports/${randomUUID()}.csv`

  const upload = new Upload({
    client: r2,
    params: {
      Key: uniqueFileName,
      Bucket: env.CLOUDFLARE_BUCKET,
      Body: csvContent,
      ContentType: 'text/csv',
    },
  })

  await upload.done()

  return makeRight({
    key: uniqueFileName,
    url: new URL(uniqueFileName, env.CLOUDFLARE_PUBLIC_URL).toString(),
  })
}