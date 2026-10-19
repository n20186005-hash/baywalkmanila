import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  // Consolidate the public HTTP URL with the HTTPS canonical, preserving paths and queries.
  if (context.url.protocol === 'http:' && context.url.hostname === 'baywalkmanila.com') {
    const canonical = new URL(context.url);
    canonical.protocol = 'https:';
    return context.redirect(canonical.href, 301);
  }
  return next();
});
