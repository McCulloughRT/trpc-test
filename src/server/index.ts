import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { router, publicProcedure } from './trpc'
import { z } from 'zod'

const appRouter = router({
	get: publicProcedure
		.input(z.object({ testDate: z.date() }))
		.query(({ input }) => {
			console.log('input.testDate', input.testDate)
			return { outputDate: new Date() }
		}),
	update: publicProcedure
		.input(z.object({ testDate: z.date() }))
		.mutation(({ input }) => {
			console.log('input.testDate', input.testDate)
			return { outputDate: new Date() }
		}),
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter

const server = createHTTPServer({
	router: appRouter,
})
server.listen(3000)
