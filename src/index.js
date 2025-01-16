function isURL(url) {
	return /^https?:/i.test(url)
}

export default {
	async fetch(request, env, context) {
		// 读取缓存
		const cacheUrl = new URL(request.url);
		const cacheKey = new Request(cacheUrl.toString());
		const cache = caches.default;
		const hasCache = await cache.match(cacheKey);
		if (hasCache) {
			console.log('cache: true', cacheKey);
			return hasCache;
		}
		if (cacheUrl.pathname === '/') {
			return new Response(null, {
				status: 302,
				headers: {
					location: 'https://github.com/ccbikai/og-image',
				},
			});
		}
		const siteURL = cacheUrl.href.replace(`${cacheUrl.origin}/`, '');
		if (!isURL(siteURL)) {
			return new Response(null, {
				status: 400,
			});
		}
		const dubRes = await fetch(`https://api.dub.co/metatags?url=${encodeURIComponent(siteURL)}`);
		let { image } = await dubRes.json();
		console.log('dub image', siteURL, image);
		if (!image) {
			const res = await fetch(siteURL, {
				headers: request.headers,
				cf: {
					cacheEverything: true,
					cacheTtl: 86400,
				}
			});
			const html = await res.text();
			const match = html.match(/<meta[^>]*?property=["']og:image["'][^>]*?content=["']([^"']*?)["'][^>]*?>/i)
				|| html.match(/<meta[^>]*?content=["']([^"']*?)["'][^>]*?property=["']og:image["'][^>]*?>/i);
			image = match?.[1];
			console.log('match image', siteURL, image);
		}
		console.log('image', siteURL, image);
		if (!isURL(image)) {
			return new Response(null, {
				status: 501,
			});
		}
		const imageRes = await fetch(image, {
			headers: {
				'user-agent': request.headers.get('user-agent'),
			},
		});
		if (imageRes.ok) {
			const imageResClone = new Response(imageRes.body, {
				headers: {
					'cache-control': 'public,max-age=604800,s-maxage=604800',
					'content-type': imageRes.headers.get('content-type'),
				},
			});
			// 写入缓存
			context.waitUntil(cache.put(cacheKey, imageResClone.clone()));
			return imageResClone;
		}
		return imageRes;
	},
};
