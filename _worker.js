/**
 * Cloudflare Pages advanced mode — يمرّر الطلبات إلى الأصول الثابتة
 * ويضبط رؤوس JSON لملفات /.well-known/ (App Links + Universal Links).
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/.well-known/')) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (!assetResponse.ok) {
        return assetResponse;
      }
      return new Response(assetResponse.body, {
        status: assetResponse.status,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
