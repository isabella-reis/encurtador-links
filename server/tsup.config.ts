import { defineConfig } from 'tsup'

export default defineConfig({
	entry: [
		'src/env.ts',
		'src/shared/either.ts',
		'src/app/services/**/*.ts',
		'src/infra/http/**/*.ts',
		'src/infra/db/index.ts',
		'src/infra/db/schemas/**/*.ts',
		'src/infra/storage/**/*.ts',
	],
	clean: true,
	format: ['esm'],
	outDir: 'dist',
})
