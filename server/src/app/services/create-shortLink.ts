    import { z } from 'zod'
    import { db } from '@/infra/db'
    import { schema } from '@/infra/db/schemas'
    import { eq } from 'drizzle-orm'
    import { makeLeft, makeRight, type Either } from '@/shared/either'
    import { uuidv7 } from 'uuidv7'

    const createShortLinkInput = z.object({
    originalUrl: z.string().url(),
    customCode: z.string().min(3).max(20),
    })

    export type CreateShortLinkInput = z.input<typeof createShortLinkInput>
    export type CreateShortLinkOutput = {
    id: string
    shortCode: string
    originalUrl: string
    hits: number
    createdAt: Date
    }
 
    export async function createShortLink(
    input: CreateShortLinkInput
    ): Promise<Either<string, CreateShortLinkOutput>> {
    const { originalUrl, customCode } = createShortLinkInput.parse(input)

    // 1. Verifica se a URL original já foi encurtada antes
    const existing = await db
        .select()
        .from(schema.shortLinks)
        .where(eq(schema.shortLinks.originalUrl, originalUrl))
        .limit(1)

    if (existing.length > 0) {
        return makeRight(existing[0])
    }

    // 2. Usa customCode se fornecido, verificando unicidade
    let shortCode = customCode || uuidv7().slice(0, 8)

    if (customCode) {
        const existingCode = await db
        .select()
        .from(schema.shortLinks)
        .where(eq(schema.shortLinks.shortCode, customCode))
        .limit(1)

        if (existingCode.length > 0) {
        return makeLeft('Esse shortCode personalizado já está em uso.')
        }
    } else {
        // 3. Em caso de colisão com shortCode aleatório, gera outro
        let collision = true
        while (collision) {
        const check = await db
            .select()
            .from(schema.shortLinks)
            .where(eq(schema.shortLinks.shortCode, shortCode))
            .limit(1)

        if (check.length === 0) {
            collision = false
        } else {
            shortCode = uuidv7().slice(0, 8)
        }
        }
    }

    // 4. Insere o novo link no banco de dados
    const [created] = await db
        .insert(schema.shortLinks)
        .values({
        shortCode,
        originalUrl,
        })
        .returning()

    return makeRight(created)
    }
