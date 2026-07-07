import * as cookie from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');
  event.locals.userid = cookies['userid'] || crypto.randomUUID();

  const response = await resolve(event);

  if (
    event.url.pathname === '/preview' ||
    event.url.pathname.startsWith('/preview/') ||
    event.url.pathname.startsWith('/api/preview/')
  ) {
    response.headers.set('cache-control', 'no-store');
    response.headers.set('x-robots-tag', 'noindex, nofollow, noarchive');
    response.headers.set('referrer-policy', 'no-referrer');
    response.headers.set('x-content-type-options', 'nosniff');
    response.headers.set(
      'permissions-policy',
      'camera=(), microphone=(), geolocation=(), payment=()'
    );
  }

  if (!cookies['userid']) {
    // if this is the first time the user has visited this app,
    // set a cookie so that we recognise them when they return
    response.headers.set(
      'set-cookie',
      cookie.serialize('userid', event.locals.userid, {
        path: '/',
        httpOnly: true
      })
    );
  }

  return response;
};
