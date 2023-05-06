async function handle(conn: Deno.Conn) {
	const httpConn = Deno.serveHttp(conn)
	for await (const requestEvent of httpConn) {
		const { pathname } = new URL(requestEvent.request.url)
		console.log('🦕 requestEvent', requestEvent)
		console.log('🦕 pathname', pathname)

		const body = JSON.stringify({ hello: 'world' })

		requestEvent.respondWith(
			new Response(body, {
				headers: {
					'content-type': 'application/json',
				},
				status: 200,
			}),
		)
	}
}

const PORT = 5174
const server = Deno.listen({ port: PORT })
console.log(
	`🦕 HTTP webserver running. Access it at:  http://localhost:${PORT}/`,
)

for await (const conn of server) {
	handle(conn)
}
