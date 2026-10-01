import article from '../../../../static/innerecho/journal-when-nothing-happened.html?raw';

export const GET = () =>
  new Response(article, {
    headers: {
      'content-type': 'text/html; charset=utf-8'
    }
  });
