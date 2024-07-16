import { createTRPCClient, unstable_httpBatchStreamLink } from '@trpc/client'
import type { AppRouter } from '../server'
import superjson from 'superjson'

const trpc = createTRPCClient<AppRouter>({
	links: [
		unstable_httpBatchStreamLink({
			transformer: superjson,
			url: 'http://localhost:3000',
		}),
	],
})

const testQuery = await trpc.get.query({ testDate: new Date() })
console.log('queryResult', testQuery)

const testMutation = await trpc.update.mutate({ testDate: new Date() })
console.log('mutationResult', testMutation)
