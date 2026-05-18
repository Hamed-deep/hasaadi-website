const GITHUB_RAW = 'https://raw.githubusercontent.com/Hamed-deep/hasaadi-website/main';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // خدمة ملفات .well-known مباشرة من GitHub
    if (pathname.startsWith('/.well-known/')) {
      const fileName = pathname.slice(1); // إزالة الـ /
      const githubUrl = `${GITHUB_RAW}/${fileName}`;
      const response = await fetch(githubUrl);

      if (!response.ok) {
        return new Response('Not found', { status: 404 });
      }

      return new Response(response.body, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // صفحة المنتج الديناميكية (/product?id=…)
    if (pathname === '/product' || pathname.startsWith('/product/')) {
      const productUrl = new URL(request.url);
      productUrl.pathname = '/product.html';
      return env.ASSETS.fetch(new Request(productUrl.toString(), request));
    }

    if (pathname === '/terms') {
      const url = new URL(request.url);
      url.pathname = '/terms.html';
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }
    if (pathname === '/refund') {
      const url = new URL(request.url);
      url.pathname = '/refund.html';
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }

    // باقي الطلبات تُمرَّر للموقع الأصلي
    return env.ASSETS.fetch(request);
  },
};
