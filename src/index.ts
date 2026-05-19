export default {
	async fetch(request, env, ctx): Promise<Response> {
		try {
			if (!env.MY_KV) {
				return new Response(
					JSON.stringify({ error: "MY_KV binding is not configured" }),
					{ status: 200, headers: { "Content-Type": "application/json" } }
				);
			}

			const value = await env.MY_KV.get("site_notice");
			return new Response(
				JSON.stringify({ site_notice: value }),
				{ status: 200, headers: { "Content-Type": "application/json" } }
			);
		} catch (err) {
			return new Response(
				JSON.stringify({ error: "Internal error", message: String(err) }),
				{ status: 200, headers: { "Content-Type": "application/json" } }
			);
		}
	},
} satisfies ExportedHandler<Env>;
